import type { PermissiveMotionProperties } from '@vueuse/motion'
import type { Handlers } from '@vueuse/gesture'
import { useMotionProperties, useSpring } from '@vueuse/motion'
import { useGesture } from '@vueuse/gesture'
import type { MaybeRef } from '@vueuse/core'

export interface CarouselOptions {
  hasNext: MaybeRef<boolean>
  hasPrev: MaybeRef<boolean>
  onPrev: () => void
  onNext: () => void
}

export const useImageGesture = (
  element: MaybeRef<HTMLElement>,
  carouselOptions?: CarouselOptions,
) => {
  const { motionProperties } = useMotionProperties(element, {
    cursor: 'grab',
    scale: 1,
    x: 0,
    y: 0,
  })

  const { set } = useSpring(motionProperties as Partial<PermissiveMotionProperties>)

  // @ts-expect-error we need to fix types: just suppress it for now
  const handlers: Handlers = {
    onPinch({ offset: [d] }) {
      set({ scale: 1 + d / 200 })
    },
    onDragStart() {
      set({ cursor: 'grabbing' })
    },
    onDrag({ movement: [x, y], pinching }) {
      if (!pinching)
        set({ x, y, cursor: 'grabbing' })
    },
    onDragEnd({ vxvy: [vx, vy], pinching }) {
      if (pinching)
        return

      set({ cursor: 'grab' })
      if (carouselOptions) {
        const isSwipe = Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5
        if (isSwipe) {
          if (vx > 0 && unref(carouselOptions.hasPrev))
            carouselOptions.onPrev()

          else if (vx < 0 && unref(carouselOptions.hasNext))
            carouselOptions.onNext()
        }
      }
      set({ x: 0, y: 0 })
    },
    onMove({ movement: [x, y], dragging, pinching }) {
      if (dragging && !pinching)
        set({ x, y })
    },
    onWheel({ event, dragging, pinching }) {
      if (!dragging && !pinching && event.altKey) {
        event.preventDefault()
        // @ts-expect-error why is ts complaining here (scale)?
        set({ scale: motionProperties.scale + event.deltaY * 0.001 })
      }
    },
    /* TODO: on double click or double tap, reset scale
    onTap: ({ event }) => {
      if (event.touches === 2)
        set({ scale: 1 })
    },
    onDoubleClick: () => {
      set({ scale: 1 })
    },
    */
  }

  useGesture(
    handlers,
    { domTarget: element },
  )
}
