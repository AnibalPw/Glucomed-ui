


export interface Respuesta {
  ok: boolean;
  msg: string;
  result?: any;
}

export interface IGlucosa {
  idUsuario?: string,
  glucosa?: number,
  nivelGlucosa?: string,
  dia?: string,
  hora?: string,
}

