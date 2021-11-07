import type {NextApiRequest, NextApiResponse} from 'next';
import md5 from 'md5';
import { DefaultResponse } from '../../types/DefaultResponse';
import { UserModel } from '../../models/UserModel';
import { dbConnect} from '../../middlewares/dbConnect';
import { User } from '../../types/User';
import { corsPolicy } from '../../middlewares/corsPolicy';

const handler = async( req : NextApiRequest, res : NextApiResponse<DefaultResponse>) => {
    try{
        if(req.method !== 'POST' || !req.body){
            return res.status(400).json({ error: 'Método informado não está disponível'});
        }

        const obj : User = req.body;

        if(!obj.name || obj.name.length < 3 || !obj.email || obj.email.length < 6
            || !obj.password || obj.password.length < 4){
            return res.status(400).json({ error: 'Parâmetros de entrada inválidos'});
        }

        const existingUser = await UserModel.find({ email : obj.email });
        if(existingUser && existingUser.length > 0){
            return res.status(400).json({ error: 'Já existe usuário com o email informado'});
        }

        obj.password = md5(obj.password);
        await UserModel.create(obj);
        return res.status(200).json({ message: 'Usuário criado com sucesso'});
    }catch(e){
        console.log(e);
        res.status(500).json({ error: 'Ocorreu erro ao cadastrar usuário, tente novamente'});
    }
} 

export default corsPolicy(dbConnect(handler));