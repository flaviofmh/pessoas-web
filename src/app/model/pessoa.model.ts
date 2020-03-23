export class Pessoa {
    constructor(
        public id: number,
        public nome: string,
        public cpf: string,
        public email: string,
        public foto: any,
        public dataNascimento: Date
    ){}
}