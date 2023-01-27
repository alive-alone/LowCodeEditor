export interface LowCodeStore {
  leftTabs: Array<leftTabsType>
  moduleDatas: Array<any>
  editingBlocksId: Array<string>
  moduleNearPosition: any
  nearGuidelines: Array<any>
  activeIndex: number
  unique_key: string
  userImages: Array<any>
  userVideos: Array<any>
}

export interface leftTabsType {
  id: number
  icon: string
  title: string
}
