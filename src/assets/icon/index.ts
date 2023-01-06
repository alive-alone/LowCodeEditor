const menu = require.context("@/assets/icon/svg/menu", false, /\.svg$/)
const font = require.context("@/assets/icon/svg/font", false, /\.svg$/)

const requireAll = (requireContext: any) => {
  // requireContext.keys()数据：['./404.svg', './agency.svg', './det.svg', './user.svg']
  requireContext.keys().map(requireContext)
}
requireAll(menu)
requireAll(font)
