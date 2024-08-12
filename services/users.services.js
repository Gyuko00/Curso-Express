const faker = require('faker');

const boom = require('@hapi/boom');

class UsersService{

  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
      isBlock: faker.datatype.boolean()
    }
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.users);
      }, 1000);
    })
  }

  async findOne(id) {
    const user = this.users.find(item => item.id === id);
    if(!user){
      throw boom.notFound('User not found');
    }
    if(user.isBlock){
      throw boom.conflict('User is blocked');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1){
      throw new Error ('User not found');
    }
    const user = this.users[index];
    if(user.isBlock){
      throw boom.conflict('User is blocked');
    }
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.products.splice(index, 1);
    return { id };
  }

}

module.exports = UsersService;
