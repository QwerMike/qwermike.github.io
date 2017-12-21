search_laptops(Screen, Proc, Ram, Storage, Link) :-
    laptop(Screen, Proc, Ram, Storage, _, Link).

search_laptops(Screen, Proc, Ram, Storage, Price, Link) :-
    laptop(Screen, Proc, Ram, Storage, ActualPrice, Link),
    ActualPrice =< Price + 500.

get_link(Screen, Proc, Ram, Storage, Price, Link) :-
    laptop(Screen, Proc, Ram, Storage, Price, Link).

get_links(Screen, Proc, Ram, Storage, Price, Results) :-
    findall(X0, get_link(Screen, Proc, Ram, Storage, Price, X0), [Link|Links]),
    slater(Link, [Link|Links], Links, Results).

slater(Link, Links, [Next|Rest], [Link|Results]):-
    \+(is_dominated(Link, Links)),
    slater(Next, Links, Rest, Results). 

slater(Link, Links, [Next|Rest], Results):-
    is_dominated(Link, Links),
    slater(Next, Links, Rest, Results).

slater(Link, Links, [], [Link]):-
    \+(is_dominated(Link, Links));
    Link = "".

is_dominated(Link, [Link1|Links]):-
    laptop(Screen, _, Ram, Storage, Price, Link),
    laptop(Screen2, _, Ram2, Storage2, Price2, Link1),
    (
    Screen2 > Screen, Ram2 > Ram, Storage2 > Storage, Price2 < Price;
    is_dominated(Link, Links)
    ).

% screen, proc, ram, storage, price, link
laptop(15, intel, 4, 500, 6999,
    "https://rozetka.com.ua/ua/asus_vivobook_max_x541na_go123/p17982198/").
laptop(15, intel, 4, 500, 6799,
    "https://rozetka.com.ua/ua/acer_nx_efaeu_054/p27775593/").
laptop(15, intel, 2, 500, 6499,
    "https://rozetka.com.ua/ua/lenovo_ideapad_110_80t700d2ra/p20851979/").
laptop(15, amd, 4, 500, 7699,
    "https://rozetka.com.ua/ua/hp_2ew01es/p24587143/").
laptop(15, intel, 8, 1000, 17299,
    "https://rozetka.com.ua/ua/dell_55i58h1r7m_lfg/p22323043/").
laptop(15, intel, 4, 500, 8499,
    "https://rozetka.com.ua/ua/acer_nx_ghaeu_004/p12200672/").
laptop(15, intel, 4, 500, 6999,
    "https://rozetka.com.ua/ua/dell_cel3060_4_500_dvd/p18581717/").
laptop(15, intel, 4, 500, 7777,
    "https://rozetka.com.ua/ua/acer_nx_gnteu_010/p19834031/").
laptop(15, intel, 8, 1000, 12199,
    "https://rozetka.com.ua/ua/lenovo_80xl03gvra/p24898903/").
laptop(13, intel, 8, 128, 25555,
    "https://rozetka.com.ua/ua/apple_mqd32ua_a/p17929266/").
laptop(17, intel, 4, 1000, 11199,
    "https://rozetka.com.ua/ua/asus_x751nv_ty001/p17998158/").
laptop(15, intel, 4, 500, 7077,
    "https://rozetka.com.ua/ua/hp_2sx53ea/p24775828/").
laptop(15, intel, 4, 1000, 8999,
    "https://rozetka.com.ua/ua/asus_vivobook_max_x541sa_dm237d/p13685268/").
laptop(15, intel, 4, 1000, 11888,
    "https://rozetka.com.ua/ua/asus_x541ua_gq1244d/p19681956/").
laptop(15, amd, 8, 1000, 14099,
    "https://rozetka.com.ua/ua/dell_i55ha10810ddl_fg/p14515940/").
laptop(15, intel, 8, 1000, 14999,
    "https://rozetka.com.ua/ua/asus_vivobook_max_x541ua_gq1429d/p17993790/").
laptop(15, intel, 4, 1000, 7250,
    "https://rozetka.com.ua/ua/lenovo_80xr00pyra/p19114186/").
laptop(15, intel, 6, 1000, 13999,
    "https://rozetka.com.ua/ua/asus_vivobook_x556uq_dm997d/p13839394/").
laptop(15, amd, 8, 1000, 10899,
    "https://rozetka.com.ua/ua/hp_255_g6_2hg32es/p19644135/").
laptop(15, intel, 8, 1000, 16777,
    "https://rozetka.com.ua/ua/asus_x541uv_gq993/p23631972/").
laptop(15, intel, 4, 1000, 11999,
    "https://rozetka.com.ua/ua/dell_inspiron_3567_i35f3410ddl_6bk/p21156864/").
laptop(15, intel, 8, 1000, 16777,
    "https://rozetka.com.ua/ua/asus_x541uv_gq997/p23654022/").
laptop(15, amd, 8, 256, 10899,
    "https://rozetka.com.ua/ua/hp_255_g6_2hg34es/p19644261/").
laptop(15, intel, 8, 256, 19999,
    "https://rozetka.com.ua/ua/dell_n021vn5568emea01_1801_ubu/p16032796/").
laptop(15, intel, 4, 500, 7999,
    "https://rozetka.com.ua/ua/asus_vivobook_e502na_dm014/p14915777/").
laptop(15, intel, 8, 256, 13999,
    "https://rozetka.com.ua/ua/lenovo_80xh00eara/p19342897/").
laptop(15, intel, 4, 500, 8399,
    "https://rozetka.com.ua/ua/hp_x5b97ea/p11073178/").
laptop(15, intel, 8, 1000, 17999,
    "https://rozetka.com.ua/ua/lenovo_80ru00svra/p13667656/").
laptop(15, intel, 4, 500, 8699,
    "https://rozetka.com.ua/ua/hp_2le31ea/p21602638/").
laptop(15, intel, 4, 128, 8399,
    "https://rozetka.com.ua/ua/lenovo_80xr00ujra/p19144713/").
laptop(15, intel, 8, 1000, 12999,
    "https://rozetka.com.ua/ua/hp_250_g6_2ev93es/p24782240/").
laptop(15, intel, 8, 256, 36999,
    "https://rozetka.com.ua/ua/dell_i75f58s2ndl_6bk/p27225993/").