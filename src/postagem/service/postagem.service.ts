import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private postagemRepositorry: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.postagemRepositorry.find();
    }

    async findById(id: number): Promise<Postagem> {

        const postagem = await this.postagemRepositorry.findOne({
            where: {
                id
            }
        });

        if (!postagem)
            throw new HttpException('Postagem não encontrada', HttpStatus.NOT_FOUND);

        return postagem;
    }
    async findAllTitulo(titulo: String): Promise<Postagem[]> {
        return await this.postagemRepositorry.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.postagemRepositorry.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {

        await this.findById(postagem.id)

        return await this.postagemRepositorry.save(postagem);

    }

    async delete(id: number): Promise<DeleteResult>{

        await this.findById(id)

        return await this.postagemRepositorry.delete(id)
    }
}
