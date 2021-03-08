interface IStatus {
  code: number
  title: string
}

const STATUS_CODE = {
  'bad-request': {
    code: 400,
    title: 'Bad Request',
  },
  'internal-error': {
    code: 500,
    title: 'Internal Server Error',
  },
}

class InternalError {
  public readonly message!: string
  public readonly status!: IStatus

  constructor(
    message: string,
    type: keyof typeof STATUS_CODE = 'internal-error'
  ) {
    this.message = message
    this.status = STATUS_CODE[type]
  }
}

export { InternalError }
