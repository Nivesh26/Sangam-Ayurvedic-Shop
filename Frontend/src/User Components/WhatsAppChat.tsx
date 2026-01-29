import whatsappLogo from '../assets/whatapp.png'

const WHATSAPP_NUMBER = '9779808000000' // Country code + number without +

const WhatsAppChat = () => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center bg-white hover:shadow-xl"
      aria-label="Chat on WhatsApp"
    >
      <img
        src={whatsappLogo}
        alt="WhatsApp"
        className="w-10 h-10 object-contain"
      />
    </a>
  )
}

export default WhatsAppChat
