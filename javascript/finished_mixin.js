var finished_mixin = {
    methods:{
        drag_over:function(e){
            e.preventDefault();
        },
        on_drop:function(e){
            e.preventDefault();
            var from_pile = e.dataTransfer.getData("from_pile");
            var from_card_code = e.dataTransfer.getData("card_id");
            var to_pile = this.get_pile_name(e.toElement);
            var to_card_code = this.get_last_code(to_pile); 
            console.log(from_pile + " " + from_card_code);
            console.log(to_pile + " "+to_card_code);
            if(this.logic_is_correct(to_card_code, from_card_code) && this.is_single_card(from_pile, from_card_code)){
                this.add_card(to_pile, from_pile);
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
        },
        get_last_code:function(pile_name){
            switch(pile_name){
                case 'pile_spade':
                   if(pile_spade.cards.length>0){
                       return pile_spade.cards[(pile_spade.cards.length)-1].code;
                   }else{
                       return "ES";
                   }
                   break;
                case 'pile_club':
                   if(pile_club.cards.length>0){
                       return pile_club.cards[(pile_club.cards.length)-1].code;
                   }else{
                       return "EC";
                   }
                   break;
                case 'pile_diamond':
                   if(pile_diamond.cards.length>0){
                       return pile_diamond.cards[(pile_diamond.cards.length)-1].code; 
                   }else{
                       return "ED";
                   }
                   break;
                case 'pile_heart':
                   if(pile_heart.cards.length>0){
                       return pile_heart.cards[(pile_heart.cards.length)-1].code;
                   }else{
                       return "EH";
                   }   
                   break;
            }
            return null;
        }, 
        logic_is_correct:function(to_card_code, from_card_code){
            var from_card_value = from_card_code[0];
            var from_card_suit = from_card_code[1];
            var to_card_value = to_card_code[0];
            var to_card_suit = to_card_code[1];
            var value_correct = this.value_is_correct(to_card_value, from_card_value);
            var suit_correct  = this.suit_is_correct(to_card_suit, from_card_suit);
            console.log(value_correct);
            console.log(suit_correct);
            if(this.value_is_correct(to_card_value, from_card_value) && this.suit_is_correct(to_card_suit, from_card_suit)){
                return true;
            }
            return false;
        },
        value_is_correct:function(to_card_value, from_card_value){
             var code_to_value = new Map([
                ['E',   0 ],
                ['A' ,  1 ],
                ['2' ,  2 ],
                ['3' ,  3 ],
                ['4' ,  4 ],
                ['5' ,  5 ], ['6' ,  6 ], ['7' ,  7 ],
                ['8' ,  8 ],
                ['9' ,  9 ],
                ['0' , 10 ],
                ['J' , 11 ],
                ['Q' , 12 ],
                ['K' , 13 ]
             ]);  
             to_card_num = code_to_value.get(to_card_value);
             from_card_num = code_to_value.get(from_card_value);
             if(to_card_num+1 == from_card_num){
                 return true;
             }
             return false;
        },
        suit_is_correct:function(to_card_suit, from_card_suit){
            console.log(to_card_suit +" "+ from_card_suit);
            if(to_card_suit == from_card_suit){
                return true;
            }
            return false;
        }, 
        add_card:function(pile_name_to, pile_name_from){
            var card_to_add = this.get_card(pile_name_from)
            switch(pile_name_to){
                case 'pile_spade':
                   pile_spade.cards.push(card_to_add); 
                   break;
                case 'pile_club':
                   pile_club.cards.push(card_to_add);
                   break;
                case 'pile_diamond':
                   pile_diamond.cards.push(card_to_add);
                   break;
                case 'pile_heart':
                   pile_heart.cards.push(card_to_add);
                   break;            
            } 
        },
        get_card:function(pile_name){
            var card;
            switch(pile_name){
                case 'playable_cards':
                   card = main_pile.playable_cards.pop();
                   break;
                case 'pile_1':
                   card = pile_1.cards.pop(); 
                   if(pile_1.cards.length>0){
                       pile_1.cards[(pile_1.cards.length)-1].active=true;
                   } 
                   break;
                case 'pile_2':
                   card = pile_2.cards.pop();
                   if(pile_2.cards.length>0){
                       pile_2.cards[(pile_2.cards.length)-1].active=true;
                   }
                   break;
                case 'pile_3':
                   card = pile_3.cards.pop();
                   if(pile_3.cards.length>0){
                       pile_3.cards[(pile_3.cards.length)-1].active=true;
                   }
 
                   break;
                case 'pile_4':
                   card = pile_4.cards.pop();
                   if(pile_4.cards.length>0){
                       pile_4.cards[(pile_4.cards.length)-1].active=true;
                   }
 
                   break;
                case 'pile_5':
                   card = pile_5.cards.pop();
                   if(pile_5.cards.length>0){
                       pile_5.cards[(pile_5.cards.length)-1].active=true;
                   }
 
                   break;
                case 'pile_6':
                   card = pile_6.cards.pop();
                   if(pile_6.cards.length>0){
                       pile_6.cards[(pile_6.cards.length)-1].active=true;
                   }
 
                   break;
                case 'pile_7':
                   card = pile_7.cards.pop();
                   if(pile_7.cards.length>0){
                       pile_7.cards[(pile_7.cards.length)-1].active=true;
                   } 
                   break;
            }
            return card;
        },
        is_single_card:function(pile_name, from_card_code){
            switch(pile_name){
                case 'playable_cards':
                    return true;
                case 'pile_1':
                    for(var i=0; i<pile_1.cards.length;i++){
                        if(pile_1.cards[i].code == from_card_code && i!=pile_1.cards.length-1){
                            return false;
                        }else if(pile_1.cards[i].code == from_card_code && i==pile_1.cards.length-1){
                            return true;
                        }
                    }
                    break;
                case 'pile_2':
                    for(var i=0; i<pile_2.cards.length;i++){
                        if(pile_2.cards[i].code == from_card_code && i!=pile_2.cards.length-1){
                            return false;
                        }else if(pile_2.cards[i].code == from_card_code && i==pile_2.cards.length-1){
                            return true;
                        }
                    }
                    break;
                case 'pile_3':
                    for(var i=0; i<pile_3.cards.length;i++){
                        if(pile_3.cards[i].code == from_card_code && i!=pile_3.cards.length-1){
                            return false;
                        }else if(pile_3.cards[i].code == from_card_code && i==pile_3.cards.length-1){
                            return true;
                        }
                    }
                    break;
                case 'pile_4':
                    for(var i=0; i<pile_4.cards.length;i++){
                        if(pile_4.cards[i].code == from_card_code && i!=pile_4.cards.length-1){
                            return false;
                        }else if(pile_4.cards[i].code == from_card_code && i==pile_4.cards.length-1){
                            return true;
                        }
                    }
                    break;
                case 'pile_5':
                    for(var i=0; i<pile_5.cards.length;i++){
                        if(pile_5.cards[i].code == from_card_code && i!=pile_5.cards.length-1){
                            return false;
                        }else if(pile_5.cards[i].code == from_card_code && i==pile_5.cards.length-1){
                            return true;
                        }
                    }
                    break;
                case 'pile_6':
                    for(var i=0; i<pile_6.cards.length;i++){
                        if(pile_6.cards[i].code == from_card_code && i!=pile_6.cards.length-1){
                            return false;
                        }else if(pile_6.cards[i].code == from_card_code && i==pile_6.cards.length-1){
                            return true;
                        }
                    }
                    break;
                case 'pile_7':
                    for(var i=0; i<pile_7.cards.length;i++){
                        if(pile_7.cards[i].code == from_card_code && i!=pile_7.cards.length-1){
                            return false;
                        }else if(pile_7.cards[i].code == from_card_code && i==pile_7.cards.length-1){
                            return true;
                        }
                    }
                    break;
            }
            return false;

        }
    }
}
