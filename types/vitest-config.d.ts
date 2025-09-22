declare module 'vitest/config' {
  export interface UserConfig {
    [key: string]: unknown
  }

  export type UserConfigExport = UserConfig | Promise<UserConfig>

  export function defineConfig(config: UserConfigExport): UserConfigExport
}
