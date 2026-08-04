export const hasMixedCase = /([a-z]+.*[A-Z])|([A-Z]+.*[a-z])/

export const hasNumber = /[0-9]/

export const hasSymbol = /\p{Z}|\p{S}|\p{P}/u

export const isEmail = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/

export const isFloat = /^[0-9.]+$/

export const isHexColor = /^#(?:[0-9a-fA-F]{3}){1,2}$/

export const isInteger = /^[0-9]+$/
