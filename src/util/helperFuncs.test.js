import { generateRandomHex } from './helperFuncs'

describe('generateRandomHex', ()=> {
  it('should produce a string of 7 characters', () => {
    expect(generateRandomHex().length).toBe(7)
  })
  it('the first character should be an octothorp', () => {
    expect(generateRandomHex()[0]).toEqual('#')
  })
  it('should only contain valid hex characters', () => {
    //already tested that the first character is an '#'
    const characters = generateRandomHex().substring(1)
    const possibleCharacters = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b', 'c', 'd', 'e', 'f']
    const result = characters.every(char => possibleCharacters.includes(char))
    expect(result).toBe(true)
  })
})