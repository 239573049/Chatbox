
export interface InstallPluginMeta {
    author?: string;
    createdAt?: string;
    homepage?: string;
    identifier: string;
  }

export interface PluginItem extends InstallPluginMeta {
    identifier: string;
    name: string;
    avatar: string;
    description: string;
}