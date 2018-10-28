var restart_mixin={
    methods:{
        restart(){
            pile_1.cards = [];
            pile_2.cards = [];
            pile_3.cards = [];
            pile_4.cards = [];
            pile_5.cards = [];
            pile_6.cards = [];
            pile_7.cards = [];
            main_pile.cards = [];
            main_pile.playable_cards = [];
            main_pile.dark_cards = [];
            pile_spade.cards = []
            pile_club.cards = [];
            pile_diamond.cards = [];
            pile_heart.cards = [];
            document.getElementById("start_screen").style.display="";
            document.getElementById("game_on").style.display="none";

        }
    }
}
