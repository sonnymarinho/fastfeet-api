import { v4 as uuidv4 } from 'uuid'

interface IUserProps {
  id?: string
  name: string
  email: string
  password: string
  deliveryman: boolean
}
export class User {
  public readonly id!: string

  public name!: string
  public email!: string
  public password!: string
  public deliveryman!: boolean

  constructor(props: IUserProps) {
    const { id } = props

    Object.assign(this, props)

    this.id = id || uuidv4()
  }
}
