import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pensamento } from '../interfaces/inter-pensamento';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PensamentoService {

    private readonly API = 'http://localhost:3000/pensamentos'

    constructor(private http: HttpClient) { }

    listar(pagina:number, filtro:string, favoritos: boolean):Observable<Pensamento[]> {

        const itensPorPagina=6

        let params = new HttpParams()
        .set("_page", pagina)
        .set("_limit", itensPorPagina)

        if(filtro.trim().length > 2){
            params = params.set("q", filtro)
        }

        if(favoritos) {
            params = params.set("favorito", true)
        }
        
        // GET /posts?_page=7
        // GET /posts?_page=7&_limit=20
        // return this.http.get<Pensamento[]>(`${this.API}?_page=${pagina}&_limit=${itensPorPagina}`)
        return this.http.get<Pensamento[]>(this.API, { params })

    }
 
    criar(pensamento:Pensamento):Observable<Pensamento> {
        return this.http.post<Pensamento>(this.API, pensamento)
    }

    excluir(id:number): Observable<Pensamento> {
        const url = `${this.API}/${id}`
        return this.http.delete<Pensamento>(url)
    }

    buscarPorID(id:number): Observable<Pensamento> {
        const url = `${this.API}/${id}`
        return this.http.get<Pensamento>(url)
    }

    editar(pensamento: Pensamento): Observable<Pensamento> {
        const url = `${this.API}/${pensamento.id}`
        return this.http.put<Pensamento>(url, pensamento)
    }

    mudarFavorito(pensamento: Pensamento): Observable<Pensamento> {
        pensamento.favorito = !pensamento.favorito
        return this.editar(pensamento)
    }

}