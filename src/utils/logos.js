import MilkLogo from '@images/icons/products/milk.svg'
import PineappleLogo from '@images/icons/products/pineapple.svg'
import BananaLogo from '@images/icons/products/banana.svg'
import BeansLogo from '@images/icons/products/beans.svg'
import CoffeeLogo from '@images/icons/products/coffee.svg'
import MangoLogo from '@images/icons/products/mango.svg'
import CashewLogo from '@images/icons/products/cashew.svg'
import CocoaLogo from '@images/icons/products/cocoa.svg'
import BeefLogo from '@images/icons/products/beef.svg'
import MaizeLogo from '@images/icons/products/maize.svg'
import VanillaLogo from '@images/icons/products/vanilla.svg'
import EggLogo from '@images/icons/products/egg.svg'
import CottonLogo from '@images/icons/products/cotton.svg'
import PeanutLogo from '@images/icons/products/peanut.svg'
import PalmOilLogo from '@images/icons/products/palm-tree.svg'
import CassavaLogo from '@images/icons/products/cassava.svg'
import FishLogo from '@images/icons/products/fish.svg'
import WheatLogo from '@images/icons/products/wheat.svg'
import DefaultLogo from '@images/icons/products/default.svg'

export const getProductLogo = (product) => {
  switch (product) {
    case 'milk':
      return MilkLogo
    case 'banana':
      return BananaLogo
    case 'coffee':
      return CoffeeLogo
    case 'cowpea':
    case 'green beans':
      return BeansLogo
    case 'mango':
    case 'mango|lime':
      return MangoLogo
    case 'cashew':
      return CashewLogo
    case 'cocoa':
      return CocoaLogo
    case 'beef':
      return BeefLogo
    case 'maize':
      return MaizeLogo
    case 'vanilla':
      return VanillaLogo
    case 'egg':
      return EggLogo
    case 'cotton':
      return CottonLogo
    case 'groundnut':
      return PeanutLogo
    case 'pineapple':
      return PineappleLogo
    case 'palm oil':
      return PalmOilLogo
    case 'sorghum':
      return WheatLogo
    case 'cassava':
      return CassavaLogo
    case 'freshwater aquaculture':
    case 'aquaculture':
    case 'coastal fisheries':
    case 'inland fisheries':
    case 'fisheries':
      return FishLogo
    default:
      return DefaultLogo
  }
}
