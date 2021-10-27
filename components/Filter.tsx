import { NextPage } from "next";
import { useState } from "react";

/* eslint-disable @next/next/no-img-element */



const Filter: NextPage = ({

}) => {

    const [showFilters, setShowFilters] = useState(false);

    return (
        <div className="container-filter">
            <div className="title">
                <span>Tarefas </span>
                <img src="/filtro.svg" alt="Filtrar tarefas" onClick={() => setShowFilters(!showFilters)} />
                <div className="form">
                    <div>
                        <label>Data prevista de conclusão:</label>
                        <input type="date" />
                    </div>
                    <div>
                        <label>até</label>
                        <input type="date" />
                    </div>
                    <div className="line" />
                    <div>
                        <label>Status</label>
                        <select>
                            <option>Todas</option>
                            <option>Ativas</option>
                            <option>Concluídas</option>
                        </select>
                    </div>
                </div>
            </div>
            {showFilters && 
                <div className="filtrosMobile">
                    <div>
                        <label>Período de:</label>
                        <input type="date" />
                    </div>
                    <div>
                        <label>Período até:</label>
                        <input type="date" />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select>
                            <option>Todas</option>
                            <option>Ativas</option>
                            <option>Concluídas</option>
                        </select>
                    </div>
                </div>
            }
        </div>
    );
}

export { Filter }