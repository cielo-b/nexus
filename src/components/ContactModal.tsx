'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Icon } from '@iconify/react'
import { X } from 'lucide-react'

// Country data with flags and phone codes
const countries = [
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', phoneCode: '+250' },
  { code: 'US', name: 'United States', flag: '🇺🇸', phoneCode: '+1' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', phoneCode: '+44' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', phoneCode: '+1' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', phoneCode: '+61' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', phoneCode: '+49' },
  { code: 'FR', name: 'France', flag: '🇫🇷', phoneCode: '+33' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', phoneCode: '+39' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', phoneCode: '+34' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', phoneCode: '+31' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', phoneCode: '+32' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', phoneCode: '+41' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', phoneCode: '+43' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', phoneCode: '+46' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', phoneCode: '+47' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', phoneCode: '+45' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', phoneCode: '+358' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', phoneCode: '+353' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', phoneCode: '+351' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', phoneCode: '+30' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', phoneCode: '+48' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', phoneCode: '+420' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', phoneCode: '+36' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', phoneCode: '+40' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', phoneCode: '+359' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', phoneCode: '+385' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', phoneCode: '+386' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', phoneCode: '+421' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', phoneCode: '+370' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', phoneCode: '+371' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', phoneCode: '+372' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', phoneCode: '+357' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', phoneCode: '+356' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', phoneCode: '+352' },
  { code: 'IN', name: 'India', flag: '🇮🇳', phoneCode: '+91' },
  { code: 'CN', name: 'China', flag: '🇨🇳', phoneCode: '+86' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', phoneCode: '+81' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', phoneCode: '+82' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', phoneCode: '+65' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', phoneCode: '+852' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', phoneCode: '+886' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', phoneCode: '+66' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', phoneCode: '+60' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', phoneCode: '+62' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', phoneCode: '+63' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', phoneCode: '+84' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', phoneCode: '+880' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', phoneCode: '+92' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', phoneCode: '+94' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', phoneCode: '+977' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹', phoneCode: '+975' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', phoneCode: '+960' },
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', phoneCode: '+93' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', phoneCode: '+98' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', phoneCode: '+964' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', phoneCode: '+966' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', phoneCode: '+971' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', phoneCode: '+974' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', phoneCode: '+965' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', phoneCode: '+973' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', phoneCode: '+968' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', phoneCode: '+967' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', phoneCode: '+962' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', phoneCode: '+961' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾', phoneCode: '+963' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', phoneCode: '+972' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸', phoneCode: '+970' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', phoneCode: '+90' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', phoneCode: '+20' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', phoneCode: '+218' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', phoneCode: '+216' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', phoneCode: '+213' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', phoneCode: '+212' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', phoneCode: '+249' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', phoneCode: '+251' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', phoneCode: '+254' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', phoneCode: '+256' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', phoneCode: '+255' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', phoneCode: '+257' },
  { code: 'CD', name: 'Democratic Republic of Congo', flag: '🇨🇩', phoneCode: '+243' },
  { code: 'CG', name: 'Republic of Congo', flag: '🇨🇬', phoneCode: '+242' },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫', phoneCode: '+236' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩', phoneCode: '+235' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', phoneCode: '+237' },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', phoneCode: '+240' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', phoneCode: '+241' },
  { code: 'ST', name: 'São Tomé and Príncipe', flag: '🇸🇹', phoneCode: '+239' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', phoneCode: '+244' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', phoneCode: '+260' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', phoneCode: '+263' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', phoneCode: '+267' },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', phoneCode: '+264' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', phoneCode: '+27' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸', phoneCode: '+266' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', phoneCode: '+268' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', phoneCode: '+261' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺', phoneCode: '+230' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', phoneCode: '+248' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲', phoneCode: '+269' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', phoneCode: '+253' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴', phoneCode: '+252' },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷', phoneCode: '+291' },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸', phoneCode: '+211' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', phoneCode: '+233' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', phoneCode: '+234' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', phoneCode: '+221' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲', phoneCode: '+220' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳', phoneCode: '+224' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', phoneCode: '+245' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', phoneCode: '+232' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', phoneCode: '+231' },
  { code: 'CI', name: 'Ivory Coast', flag: '🇨🇮', phoneCode: '+225' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', phoneCode: '+223' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', phoneCode: '+226' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', phoneCode: '+227' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', phoneCode: '+228' },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', phoneCode: '+229' },
  { code: 'CV', name: 'Cape Verde', flag: '🇨🇻', phoneCode: '+238' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷', phoneCode: '+222' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', phoneCode: '+55' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', phoneCode: '+54' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', phoneCode: '+56' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', phoneCode: '+57' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', phoneCode: '+51' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', phoneCode: '+58' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', phoneCode: '+593' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', phoneCode: '+591' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', phoneCode: '+595' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', phoneCode: '+598' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾', phoneCode: '+592' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷', phoneCode: '+597' },
  { code: 'GF', name: 'French Guiana', flag: '🇬🇫', phoneCode: '+594' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', phoneCode: '+52' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', phoneCode: '+502' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿', phoneCode: '+501' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', phoneCode: '+503' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', phoneCode: '+504' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', phoneCode: '+505' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', phoneCode: '+506' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', phoneCode: '+507' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', phoneCode: '+53' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', phoneCode: '+1' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', phoneCode: '+509' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', phoneCode: '+1' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷', phoneCode: '+1' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹', phoneCode: '+1' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧', phoneCode: '+1' },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬', phoneCode: '+1' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲', phoneCode: '+1' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩', phoneCode: '+1' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳', phoneCode: '+1' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨', phoneCode: '+1' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨', phoneCode: '+1' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', phoneCode: '+1' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', phoneCode: '+7' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', phoneCode: '+7' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', phoneCode: '+998' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', phoneCode: '+993' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', phoneCode: '+992' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', phoneCode: '+996' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳', phoneCode: '+976' },
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', phoneCode: '+93' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', phoneCode: '+92' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', phoneCode: '+880' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', phoneCode: '+94' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', phoneCode: '+977' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹', phoneCode: '+975' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', phoneCode: '+960' },
  { code: 'IN', name: 'India', flag: '🇮🇳', phoneCode: '+91' },
  { code: 'CN', name: 'China', flag: '🇨🇳', phoneCode: '+86' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', phoneCode: '+81' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', phoneCode: '+82' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', phoneCode: '+65' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', phoneCode: '+852' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', phoneCode: '+886' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', phoneCode: '+66' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', phoneCode: '+60' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', phoneCode: '+62' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', phoneCode: '+63' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', phoneCode: '+84' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', phoneCode: '+856' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', phoneCode: '+855' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', phoneCode: '+95' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', phoneCode: '+673' },
  { code: 'TL', name: 'East Timor', flag: '🇹🇱', phoneCode: '+670' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯', phoneCode: '+679' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', phoneCode: '+675' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧', phoneCode: '+677' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺', phoneCode: '+678' },
  { code: 'NC', name: 'New Caledonia', flag: '🇳🇨', phoneCode: '+687' },
  { code: 'PF', name: 'French Polynesia', flag: '🇵🇫', phoneCode: '+689' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸', phoneCode: '+685' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴', phoneCode: '+676' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮', phoneCode: '+686' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻', phoneCode: '+688' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷', phoneCode: '+674' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼', phoneCode: '+680' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲', phoneCode: '+691' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭', phoneCode: '+692' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', phoneCode: '+64' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', phoneCode: '+61' },
]

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: countries[0], // Default to Rwanda
    message: '',
    agreeToTerms: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleCountryChange = (country: typeof countries[0]) => {
    setFormData(prev => ({
      ...prev,
      country
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Form submitted:', {
      ...formData,
      fullPhoneNumber: `${formData.country.phoneCode}${formData.phoneNumber}`
    })
    
    setIsSubmitting(false)
    onClose()
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      country: countries[0],
      message: '',
      agreeToTerms: false
    })
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <Dialog.Title className="text-2xl font-bold text-gray-900">
                Contact Us
              </Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </Dialog.Close>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Email - Full Width */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Phone Number - Full Width */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="w-full flex gap-2">
                  {/* Country Selector */}
                  <div className="relative">
                    <select
                      value={formData.country.code}
                      onChange={(e) => {
                        const country = countries.find(c => c.code === e.target.value)
                        if (country) handleCountryChange(country)
                      }}
                      className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors min-w-[120px]"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.phoneCode}
                        </option>
                      ))}
                    </select>
                    <Icon 
                      icon="lucide:chevron-down" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" 
                    />
                  </div>
                  
                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Phone Number"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>
              </div>



              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter your Message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  required
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  required
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                  I agree with Terms of Use and Privacy Policy
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
