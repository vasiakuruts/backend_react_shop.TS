import { Injectable } from '@nestjs/common'

@Injectable()
export class ProductService {
	create() {
		return 'This action adds a new product'
	}

	findAll() {
		return `This action returns all product`
	}

	findOne(id: number) {
		return `This action returns a #${id} product`
	}

	update() {
		return `This action updates a # product`
	}

	remove(id: number) {
		return `This action removes a #${id} product`
	}
}
