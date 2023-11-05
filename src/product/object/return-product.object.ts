import { Prisma } from '@prisma/client'
import { returnCategoryObject } from 'src/category/object/return-category.object'
import { returnReviewObject } from 'src/review/object/return-review.object'

export const returnProductObject: Prisma.ProductSelect = {
	images: true,
	description: true,
	id: true,
	name: true,
	price: true,
	createdAt: true,
	slug: true
}

export const returnProductObjectFullest: Prisma.ProductSelect = {
	...returnProductObject,
	reviews: { select: returnReviewObject },
	category: { select: returnCategoryObject }
}
