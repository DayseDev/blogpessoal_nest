import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Postagem } from "./entities/postagem.entity";
import { PostagemController } from "./controller/postagem.controller";
import { PostagemService } from "./service/postagem.service";

@Module({
  imports: [TypeOrmModule.forFeature([Postagem])],
  controllers: [PostagemController],
  providers: [PostagemService],
  exports:[],
})
export class PostagemModule {}

