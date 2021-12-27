import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class UserPostsController {
  public async index({ params, response, view }: HttpContextContract) {
    const user = await User.find(params.user_id)
    if (!user) {
      return response.notFound('user not found')
    }
    await user.load('posts')
    return view.render('user/posts', { posts: user.posts })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('post/create')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = request.all()
    try {
      await Post.create({ ...data, userId: auth.user!.id })
      return response.redirect(`/`)
    } catch (error) {
      console.log(error)
      return response.internalServerError('error while creating post')
    }
  }

  public async show({ params, response, view }: HttpContextContract) {
    const post = await Post.find(params.id)
    if (!post) {
      return response.notFound('post not found')
    }
    return view.render('post/index', { post })
  }

  public async edit({ params, response, view }: HttpContextContract) {
    const post = await Post.find(params.id)
    if (!post) {
      return response.notFound('post not found')
    }
    return view.render('post/edit', { post })
  }

  public async update({ params, response, auth, request }: HttpContextContract) {
    const post = await Post.find(params.id)
    if (!post) {
      return response.notFound('post not found')
    }
    if (post.userId !== auth.user!.id) {
      return response.unauthorized('you cannot update this post')
    }
    const data = request.only(['name', 'slug', 'content'])
    post.merge(data)
    await post.save()
    return response.redirect(`/`)
  }

  public async destroy({ params, response, auth }: HttpContextContract) {
    const post = await Post.find(params.id)
    if (!post) {
      return response.notFound('post not found')
    }
    if (post.userId !== auth.user!.id) {
      return response.unauthorized('you cannot update this post')
    }
    await post.delete()
    return response.redirect(`/`)
  }
}
