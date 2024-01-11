import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { promisify } from "util";
import { scrypt as _scrypt, randomBytes } from "crypto";


const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService){}

  async signup(email: string, password: string) {
    // see if email is in use
    const users = await this.usersService.find(email)
    if (users.length) {
      throw new BadRequestException('email in use')
    }

    // hash password
    // Generate salt
    const salt = randomBytes(8).toString('hex')

    // hash salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer

    // Join the hashed result and salt together
    const result = salt + '.' + hash.toString('hex')

    // create new user and save it
    const user = await this.usersService.create(email, result)

    // return user
    return user
  }

  signin() {

  }
}