import { assets } from "../../assets/assets"

const Footer = () => {
  return (
      <footer className="flex md:flex-row f;ex-col-reverse 
      items-center justify-between text-left w-full px-8 border-t bg-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <img className="hidden md:block w-20 cursor-pointer" src={assets.logo}/>
          <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
          <p className="py-4 text-center text-xs md:text-sm text-gray-800">
            Copyright 2026 @ Edemy. All Right Reserved.
          </p>
        </div>
        <div className="flex item-center gap-3 max-md:mt-4">
          <a href="#" className="cursor-pointer shadow-lg"><img src={assets.facebook_icon}/></a>
          <a href="#" bg-gray-900><img src={assets.twitter_icon}/></a>
          <a href="#" bg-gray-900><img src={assets.instagram_icon}/></a>
        </div>
      </footer>
  )
}

export default Footer
