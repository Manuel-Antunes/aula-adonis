import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async index({ view, auth }: HttpContextContract) {
    await auth.user?.load('posts')
    const { posts } = auth.user!
    return view.render('home', { user: auth.user, posts })
  }
}
