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
laptop(15, intel, 8, 1, 17299,
    "https://rozetka.com.ua/ua/dell_55i58h1r7m_lfg/p22323043/").
laptop(15, intel, 4, 500, 8499,
    "https://rozetka.com.ua/ua/acer_nx_ghaeu_004/p12200672/").
laptop(15, intel, 4, 500, 6999,
    "https://rozetka.com.ua/ua/dell_cel3060_4_500_dvd/p18581717/").
laptop(15, intel, 4, 500, 7777,
    "https://rozetka.com.ua/ua/acer_nx_gnteu_010/p19834031/").
laptop(15, intel, 8, 1, 12199,
    "https://rozetka.com.ua/ua/lenovo_80xl03gvra/p24898903/").
laptop(13, intel, 8, 128, 25555,
    "https://rozetka.com.ua/ua/apple_mqd32ua_a/p17929266/").
laptop(17, intel, 4, 1, 11199,
    "https://rozetka.com.ua/ua/asus_x751nv_ty001/p17998158/").
laptop(15, intel, 4, 500, 7077,
    "https://rozetka.com.ua/ua/hp_2sx53ea/p24775828/").
laptop(15, intel, 4, 1, 8999,
    "https://rozetka.com.ua/ua/asus_vivobook_max_x541sa_dm237d/p13685268/").
laptop(15, intel, 4, 1, 11888,
    "https://rozetka.com.ua/ua/asus_x541ua_gq1244d/p19681956/").
laptop(15, amd, 8, 1, 14099,
    "https://rozetka.com.ua/ua/dell_i55ha10810ddl_fg/p14515940/").
laptop(15, intel, 8, 1, 14999,
    "https://rozetka.com.ua/ua/asus_vivobook_max_x541ua_gq1429d/p17993790/").
laptop(15, intel, 4, 1, 7250,
    "https://rozetka.com.ua/ua/lenovo_80xr00pyra/p19114186/").
laptop(15, intel, 6, 1, 13999,
    "https://rozetka.com.ua/ua/asus_vivobook_x556uq_dm997d/p13839394/").
laptop(15, amd, 8, 1, 10899,
    "https://rozetka.com.ua/ua/hp_255_g6_2hg32es/p19644135/").
laptop(15, intel, 8, 1, 16777,
    "https://rozetka.com.ua/ua/asus_x541uv_gq993/p23631972/").
laptop(15, intel, 4, 1, 11999,
    "https://rozetka.com.ua/ua/dell_inspiron_3567_i35f3410ddl_6bk/p21156864/").
laptop(15, intel, 8, 1, 16777,
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
laptop(15, intel, 8, 1, 17999,
    "https://rozetka.com.ua/ua/lenovo_80ru00svra/p13667656/").
laptop(15, intel, 4, 500, 8699,
    "https://rozetka.com.ua/ua/hp_2le31ea/p21602638/").
laptop(15, intel, 4, 128, 8399,
    "https://rozetka.com.ua/ua/lenovo_80xr00ujra/p19144713/").
laptop(15, intel, 8, 1, 12999,
    "https://rozetka.com.ua/ua/hp_250_g6_2ev93es/p24782240/").
laptop(15, intel, 8, 256, 36999,
    "https://rozetka.com.ua/ua/dell_i75f58s2ndl_6bk/p27225993/").
laptop(15, intel, 16, 1, 58777,
    "https://rozetka.com.ua/ua/asus_ux550ve_bn040t/p22213423/").
laptop(15, intel, 8, 1, 16499,
    "https://rozetka.com.ua/ua/lenovo_80xl02r5ra/p19340839/").
laptop(15, intel, 4, 1, 14899,
    "https://rozetka.com.ua/ua/acer_nx_gdzeu_059/p16104566/").
laptop(13, intel, 8, 128, 30699,
    "https://rozetka.com.ua/ua/hp_n7h79ea/p6429274/").
laptop(15, intel, 16, 1, 112099,
    "https://rozetka.com.ua/ua/apple_z0uc000cr/p21820149/").
laptop(12, intel, 8, 256, 45799,
    "https://rozetka.com.ua/ua/apple_mnyh2ua_a/p17929050/").
laptop(15, intel, 4, 128, 13499,
    "https://rozetka.com.ua/ua/acer_nx_gdheu_002/p16109114/").
laptop(13, intel, 16, 256, 67299,
    "https://rozetka.com.ua/ua/apple_z0um000wt/p21818875/").
laptop(15, intel, 8, 256, 20299,
    "https://rozetka.com.ua/ua/dell_inspiron_5567_i55f78s2ddl_6fg/p21159083/").
laptop(15, amd, 4, 500, 11499,
    "https://rozetka.com.ua/ua/hp_probook_455_x0p66es/p11107471/").
laptop(15, intel, 8, 256, 27499,
    "https://rozetka.com.ua/ua/dell_inspiron_7567_i75f58s2ndl_6b/p21160826/").
laptop(15, intel, 8, 1, 15391,
    "https://rozetka.com.ua/ua/lenovo_80th001hra/p28335121/").
laptop(15, intel, 8, 256, 23999,
    "https://rozetka.com.ua/ua/dell_n038vn5568emea01_1801_ubu/p21287155/").
laptop(15, intel, 8, 1, 16499,
    "https://rozetka.com.ua/ua/dell_inspiron_3567_35i58h1r5m_lbk/p24853599/").
laptop(13, intel, 8, 256, 63799,
    "https://rozetka.com.ua/ua/apple_mpxv2ua_a/p17962728/").
laptop(13, intel, 8, 256, 39799,
    "https://rozetka.com.ua/ua/apple_mqd42ua_a/p17929638/").
laptop(15, intel, 4, 1, 12599,
    "https://rozetka.com.ua/ua/dell_n029spcvn3568_u/p27168881/").
laptop(14, intel, 16, 256, 44688,
    "https://rozetka.com.ua/ua/lenovo_20hfs02200/p21820037/").
laptop(15, intel, 4, 500, 6799,
    "https://rozetka.com.ua/ua/hp_w4m65ea/p24199210/").
laptop(15, intel, 8, 1, 17299,
    "https://rozetka.com.ua/ua/hp_f4v30ea/p10229258/").
laptop(15, intel, 16, 256, 69199,
    "https://rozetka.com.ua/ua/apple_macbook_pro_retina_15_mjlq2uaa/p3252779/").
laptop(15, intel, 16, 512, 39999,
    "https://rozetka.com.ua/ua/asus_ux530ux_fy033t/p17736330/").
laptop(15, intel, 8, 256, 32754,
    "https://rozetka.com.ua/ua/lenovo_20h500b4rt/p21820009/").
laptop(14, intel, 4, 128, 17999,
    "https://rozetka.com.ua/ua/hp_p5r72ea/p10113779/").
laptop(12, intel, 16, 512, 51380,
    "https://rozetka.com.ua/ua/hp_z2v58ea/p21615161/").
laptop(14, intel, 8, 256, 40219,
    "https://rozetka.com.ua/ua/lenovo_thinkpad_t470s_20hfs0c100/p20085898/").
laptop(15, intel, 16, 512, 72499,
    "https://rozetka.com.ua/ua/apple_z0rf00266/p27169449/").
laptop(15, intel, 8, 256, 17999,
    "https://rozetka.com.ua/ua/lenovo_80xl02rjra/p19341847/").
laptop(15, intel, 4, 500, 15799,
    "https://rozetka.com.ua/ua/lenovo_ideapad_510_15ikb_80sv00lera/p13668244/").
laptop(14, intel, 16, 256, 23216,
    "https://rozetka.com.ua/ua/lenovo_20h1006xrt/p24395896/").
laptop(15, intel, 8, 1, 14399,
    "https://rozetka.com.ua/ua/lenovo_80xl02x0ra/p21847470/").
laptop(15, intel, 4, 1, 14999,
    "https://rozetka.com.ua/ua/dell_inspiron_3567_i35f5410dil_6bk/p24896901/").
