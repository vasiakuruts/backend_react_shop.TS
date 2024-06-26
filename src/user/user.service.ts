import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { ProductService } from 'src/product/product.service'
import { UserDto } from './dto/user.dto'
import { returnUserObject } from './object/return-user.object'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private product: ProductService) {}

  async byId(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        ...returnUserObject,
        favorites: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            slug: true,
            category: true
          }
        },
        ...selectObject
      }
    })

    if (!user) throw new Error('User not found')
    return user
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: { email: dto.email }
    })
    if (isSameUser && id !== isSameUser.id)
      throw new BadRequestException('Email already in use')

    const user = await this.byId(id)

    return this.prisma.user.update({
      where: { id },
      data: {
        email: dto.email,
        name: dto.name,
        avatarPath: dto.avatarPath,
        phone: dto.phone,
        password: dto.password ? await hash(dto.password) : user.password
      }
    })
  }
  async toggleFavorite(userId: number, productId: number) {
    const user = await this.byId(userId)
    const product = await this.product.byId(productId)

    if (!user) throw new NotFoundException('User not found!')

    const isExists = user.favorites.some(product => product.id === productId)

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: {
            id: productId,
            product: product
          }
        }
      }
    })
    return 'Success'
  }
}
