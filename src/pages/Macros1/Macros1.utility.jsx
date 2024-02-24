const valueToMacros = () => {
    let carb = 0;
    let prot = 0;
    let protl = 0;
    let proth = 0;
    let fat = 0;

    ComidaUtilizadas.map(item => {
        const valor = item.value[item.value.length - 1] == "+" || item.value[item.value.length - 1] == "-" || item.value[item.value.length - 1] == "*" || item.value[item.value.length - 1] == "/" ? eval(item.value.slice(0, -1)) : eval(item.value) ;
        
        carb += item.carb * valor;
        protl += item.protl * valor;
        proth += item.proth * valor;
        fat += item.fat * valor;
    });
    prot = protl + proth;

    protl = protl > metaProtl ? metaProtl : protl ;
    proth = proth > metaProth ? metaProth : proth ;

    let kcal = (carb + prot) * 4 + fat * 9 ;
    
    setCarb(carb.toFixed(2));
    setProt(prot.toFixed(2));
    setProtl(protl.toFixed(2));
    setProth(proth.toFixed(2));
    setFat(fat.toFixed(2));
    setKcal(kcal.toFixed(2));
}

const autoGetValue = id => {
    const optionalComida = ComidaUtilizadas.filter(comida => comida.comidaId === id);
    
    if (optionalComida.length === 1) {
        return optionalComida[0].value;
    }
    else {
        return "";
    }
}

const inputComidaAction = (e, comidaItem) => {
    let comida = {};
    Object.keys(comidaItem).map(prop => {
        comida[prop] = comidaItem[prop];
    })

    comida["value"] = e.target.value

    if (e.target.value === "") {
        ComidaUtilizadas.splice(ComidaUtilizadas.findIndex(obj => obj.comidaId === comida.comidaId), 1);
    }
    else {
        const optionalComida = ComidaUtilizadas.filter(obj => obj.comidaId === comida.comidaId);

        if (optionalComida.length == 1) {
            optionalComida[0].value = e.target.value;
        }
        else {
            ComidaUtilizadas.push(comida);
        }
    }
    
    valueToMacros();
    localStorage.setItem("comida", JSON.stringify(ComidaUtilizadas));
    Atualizador == 0 ? setAtualizador(1) : setAtualizador(0);
}

const filterAction = () => {
    ApenasUtilizados ? setApenasUtilizados(false) : setApenasUtilizados(true);

    if (ApenasUtilizados) {
        setComida(dataComida);
    }
    else {
        setComida(ComidaUtilizadas);
    }
}

const filterByTextAction = (e) => {
    let filteredData = dataComida.filter(item => item.nome.toLowerCase().includes(e.target.value.toLowerCase()));

    e.target.value ==  "" ? setComida(dataComida) : setComida(filteredData);
}

const macros = ["Carb", "Protl", "Proth", "Fat"];

const resizeSugestions = () => {
    const containerElement = document.querySelector(".info_container");

    const containerHeight = document.querySelector(".info_container").clientHeight;

    let sumHeights = 0;

    containerElement.childNodes.forEach((child, index) => {
        const containerElementStyle = getComputedStyle(child);

        if (index !== containerElement.childNodes.length - 1) sumHeights += child.clientHeight;

        sumHeights += parseFloat(containerElementStyle.paddingTop);
        sumHeights += parseFloat(containerElementStyle.marginTop);
        sumHeights += parseFloat(containerElementStyle.paddingBottom);
        sumHeights += parseFloat(containerElementStyle.marginBottom);
    });
    
    setDesignedHeight(containerHeight - sumHeights);
}