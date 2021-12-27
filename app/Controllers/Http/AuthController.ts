import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async create({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async store({ request, auth, response: res }: HttpContextContract) {
    const data = request.all()
    await auth.use('web').attempt(data.email, data.password)
    return res.redirect('/')
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()
    return response.redirect('/login')
  }
}
