var generic_mixin = {
    methods:{
        get_card_location:function(pile_name, from_card_code){
            switch(pile_name){
                case 'pile_1':
                    for(var i=0; i<pile_1.cards.length;i++){
                        if(pile_1.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_2':
                    for(var i=0; i<pile_2.cards.length;i++){
                        if(pile_2.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_3':
                    for(var i=0; i<pile_3.cards.length;i++){
                        if(pile_3.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_4':
                    for(var i=0; i<pile_4.cards.length;i++){
                        if(pile_4.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_5':
                    for(var i=0; i<pile_5.cards.length;i++){
                        if(pile_5.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_6':
                    for(var i=0; i<pile_6.cards.length;i++){
                        if(pile_6.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
                case 'pile_7':
                    for(var i=0; i<pile_7.cards.length;i++){
                        if(pile_7.cards[i].code == from_card_code){
                            return i;
                        }
                    }
                    return -1;
                    break;
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
}
