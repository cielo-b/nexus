import React from 'react'

interface TagCardProps {
  tag: string
  onClick?: (tag: string) => void
  variant?: 'default' | 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const TagCard: React.FC<TagCardProps> = ({ 
  tag, 
  onClick, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105'
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300',
    primary: 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300',
    secondary: 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300'
  }
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  return (
    <span
      className={classes}
      onClick={() => onClick?.(tag)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick(tag)
        }
      } : undefined}
    >
      {tag}
    </span>
  )
}

export default TagCard

