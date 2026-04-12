import { UserEntity, UserRepository } from "@app/database";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async update(id: number, input: Partial<UserEntity>) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        Object.assign(user, input);
        return this.userRepository.save(user);
    }

    async blockUnblock(id: number, isBlocked: boolean) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        user.isBlocked = isBlocked;
        return this.userRepository.save(user);
    }

    async delete(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new Error(`User with ID ${id} not found`);
        }
        user.isDeleted = true;
        return this.userRepository.save(user);
    }
}