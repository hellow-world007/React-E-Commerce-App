import React, { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
    
    const [ glasses, setGlasses ] = useState([])

    const [ inputValue, setInputValue ] = useState('')
    const [ isSubmit, setIsSubmit ] = useState(false)
    const [ basketItemsId, setBasketItemsId ] = useState('')
    const [ size, setSize ] = useState('')
    const [ color, setColor ] = useState('')

    const [ itemId, setItemId ] = useState([])
    const [ length, setLength ] = useState(0)
    const [ clearBasket, setClearBasket ] = useState(false)
  
    const [ status,setStatus ] = useState([])
    const [ detailStatus, setDetailStatus ] = useState([])
    const [ deleteArray,setDeleteArray ] = useState([])
    const [ removePrice,setRemovePrice ] = useState([])
    
    const [loading,setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [ array,setArray ] = useState([]);
    const [ click,setClick ] = useState(false);
  
    const value = {
        glasses, 
        setGlasses,
        inputValue,
        setInputValue,
        isSubmit, 
        setIsSubmit,
        basketItemsId, 
        setBasketItemsId,
        itemId, 
        setItemId,
        length, 
        setLength,
        clearBasket,
        setClearBasket,
        status,
        setStatus,
        loading,
        setLoading,
        size, 
        setSize,
        array,
        setArray,
        click,
        setClick,
        deleteArray,setDeleteArray,
        removePrice,setRemovePrice,
        detailStatus, setDetailStatus,
        color, setColor
    };
  
    return (
      <AppContext.Provider value={value}> 
        {children} 
      </AppContext.Provider>
    );
  };