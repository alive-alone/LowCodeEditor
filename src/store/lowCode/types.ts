export interface LowCodeStore {
  leftTabs: Array<leftTabsType>
  moduleDatas: Array<any>
  editingBlocksId: Array<string>
  moduleNearPosition: any
  nearGuidelines: Array<any>
  activeIndex: number
}

export interface leftTabsType {
  id: number
  icon: string
  title: string
}
