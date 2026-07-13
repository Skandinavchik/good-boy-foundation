import { type ContactItem } from '@/components/contact/contact-card'
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from '@fortawesome/free-solid-svg-icons'

export const CONTACT_ITEMS: ContactItem[] = [
  {
    icon: faEnvelope,
    title: 'Email',
    subtitle: 'Our friendly team is here to help.',
    actionLabel: 'hello@goodrequest.com',
    actionHref: 'mailto:hello@goodrequest.com',
  },
  {
    icon: faLocationDot,
    title: 'Office',
    subtitle: 'Come say hello at our office HQ.',
    actionLabel: 'Obchodná 3D, 010 08 Žilina, Slovakia',
    actionHref:
      'https://www.google.com/maps/search/?api=1&query=Obchodn%C3%A1+3D%2C+010+08+%C5%BDilina%2C+Slovakia',
    isExternal: true,
  },
  {
    icon: faPhone,
    title: 'Phone',
    subtitle: 'Mon-Fri from 8am to 5pm.',
    actionLabel: '+421 911 750 750',
    actionHref: 'tel:+421911750750',
  },
]
