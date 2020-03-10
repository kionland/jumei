export default {
    GoBack(bool){
        return {
            type: 'GOBACK'
            ,payload:bool
        }
    },
    Show(bool){
        return {
            type: 'SHOW'
            ,payload:bool
        }
    }
    ,
    changeIndex(index){
        return {
            type: 'CHANGEINDEX'
            ,payload:index
        }
    }
    ,
    changeIdx(index){
        return {
            type: 'CHANGEIDX'
            ,payload:index
        }
    }
    ,
    changeWarn(bool){
        return {
            type: 'CHANGEWARN'
            ,payload:bool
        }
    }
    ,
    setPhone(value){
        return {
            type: 'SETPHONE'
            ,payload:value
        }
    }
    ,
    setPassword1(value){
        return {
            type: 'SETPASSWORD1'
            ,payload:value
        }
    }
    ,
    setPassword2(value){
        return {
            type: 'SETPASSWORD2'
            ,payload:value
        }
    }
    ,
    setListId(list_id,table){
        return {
            type: 'SETLISTID'
            , payload: { list_id,table}
        }
    }
    ,
    setToken(bool){
        return {
            type: 'SETTOKEN'
            , payload: bool
        }
    }
    ,
    setCartlist(cartlist){
        return {
            type: 'SETCARTLIST'
            , payload: cartlist
        }
    }
    ,
    changeVisible(bool){
        return {
            type: 'CHANGEVISIBLE'
            , payload: bool
        }
    }
    ,
    comfirmRemove(bool){
        return {
            type: 'COMFIRMREMOVE'
            , payload: bool
        }
    }
    ,
    everyIsChecked(bool){
        return {
            type: 'EVERYISCHECKED'
            , payload: bool
        }
    }
   
    
}