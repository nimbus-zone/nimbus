export default defineAppConfig({
  docus: {
    title: 'Nimbus',
    description: 'A nimble Bluesky web client.',
    image: 'https://docs.nimbus.zone/nimbus-screenshot.png',
    socials: {
      // twitter: 'elk_zone',
      github: 'nimbus-zone/nimbus',
      bluesky: {
        label: 'Bluesky',
        icon: 'IconBluesky',
        // change this when Nimbus ready
        href: 'https://bsky.app/profile/nimbus',
      },
    },
    aside: {
      level: 0,
      exclude: [],
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
    },
    footer: {
      iconLinks: [
        {
          href: 'https://nuxt.com',
          icon: 'IconNuxtLabs',
        },
        {
          // change this when Nimbus ready
          href: 'https://bsky.app/profile/nimbus',
          icon: 'IconBluesky',
        },
      ],
    },
  },
})
