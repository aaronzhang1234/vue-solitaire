var dragging_mixin = {
    methods:{
        on_drag_start: function(e){
            var card_id = e.srcElement.id;
            e.dataTransfer.setData("card_id", card_id);
            var from_pile = this.get_pile_name(e.srcElement);
            e.dataTransfer.setData("from_pile", from_pile);
        }
    },
    get_pile_name:function(element){
        while(element){ 
            if(element.id!=null && (element.id).substring(0,4)=="pile"){
                return element.id
            }
            element = element.parentElement;
        }
        return element.id;
    }
}


