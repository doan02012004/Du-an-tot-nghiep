import logo from '../../../assets/logos/logo.png'

const Logo = () => {
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
    <a href="/" className="block">
        <img src={logo} className="w-[140px] h-auto object-contain" />
    </a>
</div>
  )
}

export default Logo