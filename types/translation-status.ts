export interface NimbusTranslationStatus {
  total: number
  locales: Record<string, {
    percentage: string
    total: number
  }>
}
