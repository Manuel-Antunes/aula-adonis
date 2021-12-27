import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async store(ctx: HttpContextContract) {
    try {
      const data = ctx.request.all()
      await User.create(data)
      return ctx.response.redirect('/login')
    } catch (error) {
      ctx.response.badRequest('Error while creating user')
    }
  } // cria um no banco

  public async create(cxt: HttpContextContract) {
    return cxt.view.render('auth/register', {})
  }
}
