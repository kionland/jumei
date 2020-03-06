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
    
}