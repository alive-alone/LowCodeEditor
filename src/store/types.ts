import { LowCodeStore } from "./lowCode/types"
export interface IRootState {}

export interface IRootWithModule {
  LowCodeModule: LowCodeStore
}

export type IStoreType = IRootState & IRootWithModule
