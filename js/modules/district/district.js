define('district', ['jquery', 'map', 'template', 'mustache', 'geoJsonEncoded'], function($, M, T, MT){
	
	// 地图对象
	var map = M.getMap();
	var currentNode, checkedNodes, zoomBefore, zoomAfter, subjectType;
	var stateGb, provinceGb, cityGb;
	var layercache = {}, geoJson;
	var gbGeoJson, xjGeojson, gbborder;
    var layerInfos = [];
	// 新疆regions
	var xjRegions = {"type":"Feature","features":[{"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[74.81028,37.2168],[75.12717,37.33573],[75.10042,37.48624],[74.877,37.59328],[74.917,38.02561],[74.81694,38.09791],[74.79043,38.27102],[74.86435,38.47251],[74.63552,38.59519],[74.39928,38.66063],[74.12309,38.66326],[74.04128,38.54366]]}}]};
	var colors = ['#EEC591', '#EEAD0E', '#EE7600', '#F08080', '#EE6A50', '#DC143C']; // 行政区划颜色集
	var fillOpacity = 0.7;
	var datas = [{"data":{"area":451446.99,"country":"中国","ename":"Heilongjiang Sheng","lng":"126.763","province":"黑龙江省","cname":"黑龙江省","summarize":"　　黑龙江省有着悠久的历史。公元前4世纪至公元前3世纪，就有夫余政权建立，地跨今黑龙江省南部。唐代设渤海都督府、黑水都督府、室韦都督府。辽时归东京道管辖。金时属上京道管辖。元设开元路、水达达路。明设奴儿干都司。清设黑龙江将军和吉林将军，管辖黑龙江地区。新中国成立后，设黑龙江省和松江省，1954年将两省合并为黑龙江省。","region":"东北地区","gbcode":156230000,"lat":"47.1085","population":38313991},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156230000","population":"人口(人)"}},
        {"data":{"area":190588.85,"country":"中国","ename":"Jilin Sheng","lng":"126.165","province":"吉林省","cname":"吉林省","summarize":"　　吉林省位于中国东北地区中部，北接黑龙江省，南接辽宁省，西邻内蒙古自治区。处于日本、俄罗斯、朝鲜、韩国、蒙古与中国东北部组成的东北亚的腹心地带,东与俄罗斯接壤，东南部以图们江、鸭绿江为界与朝鲜民主主义人民共和国隔江相望。地处东经122-131度，北纬41-46度之间。幅员面积为18.74万平方公里，占全国总面积的2%，东西长750公里，南北宽600公里。边境线全长1384.5公里，其中，中朝边境线长1138.5公里，中俄边境线长246公里。\r\n \r\n　　2012年全省人口2750.4万，占全国的2.03%。吉林省是多民族省份，有朝鲜族、满族、蒙古族、回族等55个少数民族，人口218.57万，占总人口的7.96%。现辖1个副省级市、7个地级市和延边朝鲜族自治州、长白山管委会，60个县（市、区）。\r\n","region":"东北地区","gbcode":156220000,"lat":"43.3806","population":27452815},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156220000","population":"人口(人)"}},
        {"data":{"area":145854.08,"country":"中国","ename":"Liaoning Sheng","lng":"123.39","province":"辽宁省","cname":"辽宁省","summarize":"　　辽宁省位于中国东北地区南部。地理位置介于东经118°53′－125°46′，北纬38°43′－43°26′之间，处于温带－暖温带区域并与吉林、内蒙古、河北等省区接壤，东南隔鸭绿江与朝鲜为邻。有汉、满、蒙古、回、朝鲜、锡伯等民族。","region":"东北地区","gbcode":156210000,"lat":"41.2222","population":43746323},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156210000","population":"人口(人)"}},
        {"data":{"area":1139888.03,"country":"中国","ename":"Neimenggu Zizhiqu","lng":"111.23","province":"内蒙古自治区","cname":"内蒙古自治区","summarize":"　　内蒙古自治区位于中国北部边疆，由东北向西南斜伸，呈狭长形，东西直线距离2400公里，南北跨度1700公里，横跨东北、华北、西北三大区。土地总面积118.3万平方公里，占全国总面积的12.3%，在全国各省、市、自治区中名列第三位。东南西与8省区毗邻，北与蒙古国、俄罗斯接壤，国境线长4200公里。","region":"华北地区","gbcode":156150000,"lat":"42.0132","population":24706291},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156150000","population":"人口(人)"}},
        {"data":{"area":187577.08,"country":"中国","ename":"Hebei Sheng","lng":"115.44","province":"河北省","cname":"河北省","summarize":"　　河北省地处华北平原，兼跨内蒙古高原。全省中环首都北京和北方重要商埠天津市，北与辽宁、内蒙古为邻，西靠山西，南与河南、山东接壤，东临渤海。海岸线长487公里。总面积18.8万平方公里。","region":"华北地区","gbcode":156130000,"lat":"38.569","population":71854210},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156130000","population":"人口(人)"}},
        {"data":{"area":11675.86,"country":"中国","ename":"Tianjin Shi","lng":"117.194295","province":"天津市","cname":"天津市","summarize":"　　天津地处华北平原东北部，环渤海湾的中心，东临渤海，北依燕山，位于北纬38°34'至40°15'，东经116°43'至118°04'之间。北与首都北京毗邻，东、西、南分别与河北省的唐山、承德、廊坊、沧州地区接壤。海岸线长约153公里。面积11916.88平方公里。天津这个名称最早出现于中国明朝永乐初年，意为天子经过的渡口。明朝永乐二年（公元1404年），作为军事要地，天津开始筑城设卫，称天津卫。","region":"华北地区","gbcode":156120000,"lat":"39.082634","population":12938693},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156120000","population":"人口(人)"}},
        {"data":{"area":16387.68,"country":"中国","ename":"Beijing Shi","lng":"116.401003","province":"北京市","cname":"北京市","summarize":"北京，简称”京”，是中华人民共和国的首都，是全国的政治中心、文化中心，是世界著名古都和现代化国际城市。北京位于北纬39度56分、东经116度20分，地处华北大平原的北部，东面与天津市毗连，其余均与河北省相邻。","region":"华北地区","gbcode":156110000,"lat":"39.903117","population":19612368},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156110000","population":"人口(人)"}},
        {"data":{"area":156330.85,"country":"中国","ename":"Shandong Sheng","lng":"118.094","province":"山东省","cname":"山东省","summarize":"　　山东省位于中国东部沿海、黄河下游，北纬34°22.9′-38°24.01′、东经114°47.5′-122°42.3′之间。境域包括半岛和内陆两部分，山东半岛突出于渤海、黄海之中，同辽东半岛遥相对峙；内陆部分自北而南与河北、河南、安徽、江苏4省接壤。全境南北最长约420多公里，东西最宽约700多公里，总面积15.71万平方公里，约占全国总面积的1.64%。","region":"华东地区","gbcode":156370000,"lat":"35.948","population":95792719},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156370000","population":"人口(人)"}},
        {"data":{"area":102017.11,"country":"中国","ename":"Jiangsu Sheng","lng":"118.969","province":"江苏省","cname":"江苏省","summarize":"　　江苏简称苏，位于我国大陆东部沿海中心、介于东经116°18′－121°57′，北纬30°45′－35°20′之间。跨长江下游两岸，东濒黄海，东南与浙江和上海毗邻，西连安徽，北接山东。","region":"华东地区","gbcode":156320000,"lat":"33.6022","population":78660941},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156320000","population":"人口(人)"}},
        {"data":{"area":7958.9,"country":"中国","ename":"Shanghai Shi","lng":"121.470161","province":"上海市","cname":"上海市","summarize":"　　上海位于北纬31度14分，东经121度29分。地处长江三角洲前缘，东濒东海，南临杭州湾，西接江苏、浙江两省，北界长江入海口，正当我国南北海岸线的中部，交通便利，腹地广阔，位置优越，是一个良好的江海港口。","region":"华东地区","gbcode":156310000,"lat":"31.232624","population":23019196},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156310000","population":"人口(人)"}},
        {"data":{"area":104592.32,"country":"中国","ename":"Zhejiang Sheng","lng":"119.62","province":"浙江省","cname":"浙江省","summarize":"　　浙江省地处中国东南沿海长江三角洲南翼，东临东海，南接福建，西与江西、安徽相连，北与上海、江苏接壤。境内最大的河流钱塘江，因江流曲折，称之江，又称浙江，省以江名，简称\"浙\"。省会杭州。浙江省东西和南北的直线距离均为450公里左右，陆域面积10.18万平方公里，为全国的1.06%，是中国面积最小的省份之一。全省有杭州市、宁波市等2个副省级城市，温州、湖州、嘉兴、绍兴、金华、衢州、舟山、台州、丽水等9个地级市。全省下设36个县、22个县级市和32个市属城区。2012年末全省常住人口5477万人。","region":"华东地区","gbcode":156330000,"lat":"29.2844","population":54426891},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156330000","population":"人口(人)"}},
        {"data":{"area":140237.54,"country":"中国","ename":"Anhui Sheng","lng":"117.276","province":"安徽省","cname":"安徽省","summarize":"　　安徽位于华东腹地，是我国东部襟江近海的内陆省份，跨长江、淮河中下游，东连江苏、浙江，西接湖北、河南，南邻江西，北靠山东。安徽清初属江南省，康熙六年（公元1667年），析江南省为江苏、安徽两省而正式建省，取当时安庆、徽州两府首字得名。境内有皖山、皖水，即现今的天柱山和皖河，春秋时（公元前722-前481年）曾被封为伯国，称为皖国，故安徽简称皖。","region":"华东地区","gbcode":156340000,"lat":"32.4484","population":59500468},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156340000","population":"人口(人)"}},
        {"data":{"area":165703.36,"country":"中国","ename":"Henan Sheng","lng":"113.302","province":"河南省","cname":"河南省","summarize":"　　河南省位于中国中东部，黄河中下游，黄淮海平原西南部，河南省古代辖区位于黄河之南，故名\"河南\"。2000多年前，河南是中国九州中心的豫州，所以，河南简称\"豫\"，且有\"中州\"、\"中原\"之称。河南与河北、山西、陕西、湖北、安徽、山东毗邻。全省总面积16.7万平方公里。黄河流经河南境内700多公里。","region":"中南地区","gbcode":156410000,"lat":"33.7649","population":94029939},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156410000","population":"人口(人)"}},
        {"data":{"area":156712.58,"country":"中国","ename":"Shanxi Sheng","lng":"112.143","province":"山西省","cname":"山西省","summarize":"　　山西省地处黄河流域中部，东有巍巍太行山作天然屏障，与河北省为邻；西、南部以黄河为堑，与陕西省、河南省相望；北跨绵绵长城，与内蒙古自治区毗连。因地属太行山以西，故名山西。春秋战国时期属晋国地，故简称“晋”；战国初期，韩、赵、魏三分晋国，因而又称“三晋”。全省总面积15.67万平方公里，总人口3610.8万人，辖11个地级市，119个县、市、区。","region":"华北地区","gbcode":156140000,"lat":"37.3992","population":35712101},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156140000","population":"人口(人)"}},
        {"data":{"area":205566.69,"country":"中国","ename":"Shanxi Sheng","lng":"107.93","province":"陕西省","cname":"陕西省","summarize":"　　陕西省简称“陕”或“秦”，位于中国内陆腹地，黄河中游，地处东经105°29′～111°15′,北纬31°42′～39°35′之间。东邻山西、河南，西连宁夏、甘肃，南抵四川、重庆、湖北，北接内蒙，居于连接中国东、中部地区和西北、西南的重要位置。我国大地原点就在陕西省泾阳县永乐镇。 \r\n　　全省地域南北长、东西窄，南北长约870公里，东西宽200至500公里。\r\n \r\n　　全省以秦岭为界南北河流分属长江水系和黄河水系。主要有渭河、泾河、洛河、无定河和汉江、丹江、嘉陵江等。\r\n　　全省土地面积为20.58万平方公里。","region":"西北地区","gbcode":156610000,"lat":"33.4048","population":37327379},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156610000","population":"人口(人)"}},
        {"data":{"area":186061.29,"country":"中国","ename":"Hubei Sheng","lng":"112.328","province":"湖北省","cname":"湖北省","summarize":"　　湖北省位于中华人民共和国的中部，简称鄂。地跨东经108°21′42″～116°07′50″、北纬29°01′53″～33°6′47″。东邻安徽，南界江西、湖南，西连重庆，西北与陕西接壤，北与河南毗邻。东西长约740公里，南北宽约470公里。全省国土总面积18.59万平方公里，占全国总面积的1.94%。","region":"中南地区","gbcode":156420000,"lat":"30.9327","population":57237727},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156420000","population":"人口(人)"}},
        {"data":{"area":212201.46,"country":"中国","ename":"Hunan Sheng","lng":"111.709","province":"湖南省","cname":"湖南省","summarize":"　　湖南幅员辽阔，地处东经108°47′-114°15′，北纬24°39′-30°08′，东邻江西，南接广东、广西，西连贵州、重庆，北交湖北，位于长江中游、洞庭湖以南，是我国东南腹地。因全省大部分地处洞庭湖以南而得名，因省内最大河流湘江流贯全境而简称“湘”，因自古广植木芙蓉和水芙蓉而有“芙蓉国”之称。全省辖13个市、1个自治州、122个县（市、区），在幅员辽阔的三湘大地上，生活着汉、土家、苗、侗、回等55个民族。","region":"中南地区","gbcode":156430000,"lat":"27.5602","population":65700762},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156430000","population":"人口(人)"}},
        {"data":{"area":167208.27,"country":"中国","ename":"Jiangxi Sheng","lng":"115.587","province":"江西省","cname":"江西省","summarize":"　　江西简称“赣”，是中国内陆省份之一。 位于中国东南部，在长江中下游南岸，处于北纬24°29′14″至30°04′43″与东经113°34′18″至118°28′56″之间。东邻浙江、福建，南连广东，西接湖南，北毗湖北、安徽。全省总面积16.69万平方公里。","region":"华东地区","gbcode":156360000,"lat":"27.8652","population":44567797},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156360000","population":"人口(人)"}},
        {"data":{"area":122298.63,"country":"中国","ename":"Fujian Sheng","lng":"117.547","province":"福建省","cname":"福建省","summarize":"　　福建，简称“闽”,位于我国东南沿海，东隔台湾海峡与台湾省相望。陆地平面形状似一斜长方形，东西最大间距约480千米，南北最大间距约530千米。全省大部分属中亚热带，闽东南部分地区属南亚热带。土地总面积12.4万平方千米，海域面积13.6万平方千米。陆地海岸线长达3752千米，位居全国第二位；海岸线曲折率1∶7.01，居全国第一位。森林覆盖率居全国首位。","region":"华东地区","gbcode":156350000,"lat":"25.8037","population":36894217},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156350000","population":"人口(人)"}},
        {"data":{"area":25.35,"country":"中国","ename":"Ao Men Te Bie Xing Zheng Qu","lng":"113.5381","province":"澳門特別行政區","cname":"澳門特別行政區","summarize":"澳门（Macau）是中华人民共和国两个特别行政区之一，位于中国东南沿海的珠江三角洲西侧，东邻珠江口，西接磨刀门，南对南中国海，北以关闸为界与珠海经济特区的拱北接壤。全区由澳门半岛与两个由大桥相连的离岛氹仔岛、路环岛组成，总面积共29.2平方公里，约有50余万人，是全球人口密度最高的地区。1999年12月20日澳门回归中国之后，经济迅速增长，比往日更繁荣，是一国两制的成功典范。其著名的轻工业、美食、旅游业、酒店和娱乐场使澳门长盛不衰，澳门成为亚洲最发达、最富裕的地区。","region":"港澳台地区","gbcode":156820000,"lat":"22.18975"},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156820000","population":"人口(人)"}},
        {"data":{"area":177852.48,"country":"中国","ename":"Guangdong Sheng","lng":"113.488","province":"广东省","cname":"广东省","summarize":"　　广东省位于中国大陆最南部，陆地面积17.98万平方公里，海岛面积1592.7平方公里，南临南海，大陆海岸线总长3368.1公里，岛屿众多。全省地处低纬度，北回归线横贯陆地中部。2122公里长的珠江为中国第三大河流，珠江　　三角洲土地肥沃，是著名的鱼米之乡。","region":"中南地区","gbcode":156440000,"lat":"24.1042","population":104320459},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156440000","population":"人口(人)"}},
        {"data":{"area":237049.57,"country":"中国","ename":"Guangxizhuangzu Zizhiqu","lng":"108.588","province":"广西壮族自治区","cname":"广西壮族自治区","summarize":"　　广西壮族自治区简称桂，地处祖国南疆，位于东经104°28′-112°04′，北纬20°54′-26°24′之间，北回归线横贯全区中部。广西土地总面积23.76万平方公里，占全国土地总面积约2.5%，居各省、自治区、直辖市第九位；大陆海岸线总长1595公里，沿海港口资源、海洋生物资源、滨海旅游资源丰富。广西有壮、汉、瑶、苗、侗、仫佬、毛南、回、京、彝、水、仡佬等12个世居民族。2012年末全区总人口5240万人，少数民族人口为1988万人，占37.94%，壮族人口为1685万人，占32.16%。广西是中国唯一临海的少数民族自治区、西部唯一的沿海地区，是中国对外开放、走向东盟、走向世界的重要门户和前沿，是大西南最便捷的出海口。","region":"中南地区","gbcode":156450000,"lat":"23.9298","population":46023761},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156450000","population":"人口(人)"}},
        {"data":{"area":176407.43,"country":"中国","ename":"Guizhou Sheng","lng":"106.148","province":"贵州省","cname":"贵州省","summarize":"　　贵州简称“黔”或“贵”，辖6个地级市、3个自治州，共有88个县(市、区、特区)，国土面积17.6万平方千米，其中民族自治地方占全省总面积的55.5%，据全国第六次人口普查，全省常住人口3475万人，少数民族人口占全省总人口的36.1%，是一个山川秀丽、气候宜人、资源丰富、人民勤劳、少数民族聚集、发展潜力很大的省份。\r\n　　贵州是古人类发祥地之一，早在24万年前就有人类居住、活动，有旧石器时代早期的“黔西观音洞文化”，晚期直立人的“桐梓人”，早期智人的“水城人”和盘县“大洞人”，晚期智人的“兴义人”、普定“穿洞人”、桐梓“马鞍山人”、“白岩脚洞人”和安龙“观音洞人”。春秋以前贵州大部分地区属于“荆楚”的黔中地区，秦朝曾在夜郎地区设郡县、置官吏，公元前28年—前25年郡县制在今贵州地区最后确立，宋朝开宝年间“贵州”开始成为行政区划的名称。明永乐十一年(公元1413年)，贵州布政使司建立，使贵州成为当时全国13个行省之一。清朝雍正五年(公元1727年)，四川统属遵义府改隶贵州，毕节以北的永宁(今叙永)划归四川，广西永丰州(后改为贞丰)、荔波，湖广平溪(今玉屏)、天柱划归贵州，大体形成了今天贵州的地域范围。\r\n　　贵州文化灿烂，早在夜郎、秦汉时期，有舍人著《尔雅注》三卷，尹珍开“南域之学”传播中原文化。明初彝族女政治家奢香开设“龙场九驿”，稳定西南政局。明正德三年(1508年)，王守仁谪居龙场(今贵州修文县城)，成就“心即理”和“知行合一”学说。戊戌维新运动中，贵州96名应试举人参加了“公车上书”，占全部上书人数的六分之一。“五四”运动爆发后，涌现出了邓恩铭、王若飞、周逸群等早期共产主义战士。　　1935年1月，中共中央在遵义召开的中央政治局扩大会议，即著名的“遵义会议”，挽救了中国共产党、中国红军和中国革命，是中国共产党历史上一个生死攸关的转折点。抗日战争时期，贵州是大后方、西南大通道，为抗战胜利作出了积极贡献。1949年11月15日，中国人民解放军解放贵阳。","region":"西南地区","gbcode":156520000,"lat":"26.1343","population":34748556},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156520000","population":"人口(人)"}},
        {"data":{"area":82480.98,"country":"中国","ename":"Chongqing Shi","lng":"106.547095","province":"重庆市","cname":"重庆市","summarize":"　　位于中国西南部，地处较为发达的东部地区和资源丰富的西部地区的结合部，东邻湖北、湖南，南靠贵州，西接四川，北连陕西，总面积82,400平方公里。重庆是我国重要的中心城市之一，国家历史文化名城，国家重要的现代制造业基地，西南地区综合交通枢纽。1997年3月14日，第八届全国人民代表大会第五次会议通过了设立重庆直辖市的决议，与北京、天津、上海同为直辖市。","region":"西南地区","gbcode":156500000,"lat":"29.568035","population":28846170},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156500000","population":"人口(人)"}},
        {"data":{"area":486636.86,"country":"中国","ename":"Sichuan Sheng","lng":"102.54","province":"四川省","cname":"四川省","summarize":"　　四川地处中国西部，是西南、西北和中部地区的重要结合部，是承接华南华中、连接西南西北、沟通中亚南亚东南亚的重要交汇点和交通走廊。辖区面积48.6万平方公里，居中国第5位，辖21个市（州），183个县（市、区），是我们国家的资源大省、人口大省、经济大省。","region":"西南地区","gbcode":156510000,"lat":"31.1667","population":80417528},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156510000","population":"人口(人)"}},
        {"data":{"area":425091.16,"country":"中国","ename":"Gansu Sheng","lng":"103.771","province":"甘肃省","cname":"甘肃省","summarize":"　　甘肃以古甘州（今张掖）、肃州（今酒泉）两地首字而得名。由于西夏曾置甘肃军司，元代设甘肃省，简称甘；又因省境大部分在陇山（六盘山）以西，而唐代曾在此设置过陇右道，故又简称为陇。甘肃位于我国版图内陆西北部，地处黄河上游，总面积42.58万平方公里，居全国第七位。介于北纬32°31′－42°57′、东经92°13′－108°46′之间。东接陕西，南邻四川，西连青海、新疆，北靠内蒙、宁夏并与蒙古国接壤。","region":"西北地区","gbcode":156620000,"lat":"35.1618","population":25575263},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156620000","population":"人口(人)"}},
        {"data":{"area":51935.43,"country":"中国","ename":"Ningxiahuizu Zizhiqu","lng":"106.043","province":"宁夏回族自治区","cname":"宁夏回族自治区","summarize":"　　宁夏回族自治区成立于1958年，全区总面积6.64万平方公里，地处祖国西北地区，黄河中上游。现辖5个地级市，2个县级市，11个县，7个市辖区和1个县级移民开发区，首府银川市。　宁夏回族自治区简称宁，位于中国西北部，地处黄河中上游，是中国五个少数民族自治区之一东邻陕西，北接内蒙古，南与甘肃相连。","region":"西北地区","gbcode":156640000,"lat":"37.4018","population":6301350},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156640000","population":"人口(人)"}},
        {"data":{"area":36401.84,"country":"中国","ename":"Taiwan Sheng","lng":"120.84","province":"台湾省","cname":"台湾省","summarize":"台湾省，简称台，位于祖国大陆东南海域，西隔台湾海峡与福建省相望，东滨太平洋，北临东海，南界巴士海峡，与菲律宾相邻。台湾省包括台湾本岛及兰屿、钓鱼岛等21个附属岛屿，澎湖列岛64个岛屿。台湾是全国面积较小、人口密度较大的省份。其工业以轻纺、装配业为主体，出口加工业发展迅速，高附加值工业发达。由于台湾耕作制为二年五熟或一年三熟，适宜热带、亚热带作物生长，故有“宝岛”之称。宝岛台湾自然风光怡人，有“八景十二胜”之说。其特产丰富，既有高价值的珊瑚及工艺特产，又有草编、竹艺、藤器等日用工艺品。此外，独特的少数民族风情也是台湾的一大特色，高山族人民热情好客，能歌善舞，“杵歌”驰誉世界。","region":"港澳台地区","gbcode":156710000,"lat":"23.62"},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156710000","population":"人口(人)"}},
        {"data":{"area":2760.5,"country":"中国","ename":"Xiang Gang Te Bie Xing Zheng Qu","lng":"116.97","province":"香港特別行政區","cname":"香港特別行政區","summarize":"香港，简称“港”，位于我国华南沿岸，在中国广东省珠江口以东，由香港岛、九龙半岛、新界内陆地区以及262个大小岛屿（离岛）组成。香港北接广东省深圳市，南面是广东省珠海市万山群岛。香港与西边的澳门隔江相对61公里，北距广州130公里、距上海1200公里。香港是一个从昔日的小渔村到如今天的繁华超级城市，从殖民地到世界上第一个实施“一国两制”的地方。香港说大不大说小不小，在这片弹丸之地历经风云变幻，拥有着中西融合、兼容并蓄的种种惊艳，这里有世界级的建筑、发达的电影工业、狂热的赛马博彩、时尚摩登的娱乐享受，每一处的精彩都让你觉得值得为她驻足。","region":"港澳台地区","gbcode":156810000,"lat":"22.04"},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156810000","population":"人口(人)"}},
        {"data":{"area":34063.5,"country":"中国","ename":"Hainan Sheng","lng":"109.604","province":"海南省","cname":"海南省","summarize":"　　海南省位于中国最南端，北以琼州海峡与广东省划界，西临北部湾与越南民主共和国相对，东濒南海与台湾省相望，东南和南边在南海中与菲律宾、文莱和马来西亚为邻。海南省的行政区域包括海南岛和西沙群岛、中沙群岛、南沙群岛的岛礁及其海域。全省陆地（包括海南岛和西沙、中沙、南沙群岛）总面积3.5万平方公里，海域面积约200万平方公里。海南岛形似一个呈东北至西南向的椭圆形大雪梨，总面积（不包括卫星岛）3.39万平方公里，是我国仅次于台湾岛的第二大岛。海南岛与广东省的雷州半岛相隔的琼州海峡宽约18海里，南沙群岛的曾母暗沙是我国最南端的领土。","region":"中南地区","gbcode":156460000,"lat":"19.1648","population":8671485},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156460000","population":"人口(人)"}},
        {"data":{"area":384010.69,"country":"中国","ename":"Yunnan Sheng","lng":"100.569","province":"云南省","cname":"云南省","summarize":"　　云南简称“滇”或“云”，有“彩云之南”的美称。全省东西最大横距864.9千米，南北最大横距990千米，总面积39.4万平方千米，占全国陆地总面积的4.1%，居全国第8位。全省辖16个州（市）、129个县（市、区）。 ","region":"西南地区","gbcode":156530000,"lat":"25.0651","population":45966766},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156530000","population":"人口(人)"}},
        {"data":{"area":1203457.11,"country":"中国","ename":"Xizang Zizhiqu","lng":"87.8386","province":"西藏自治区","cname":"西藏自治区","summarize":"　　西藏自治区位于青藏高原西南部,地处北纬26°52′至36°32′,东经78°24′至99°06′之间的广大地区｡北邻新疆,东连四川,东北紧靠青海,东南连接云南,南与缅甸､印度､不丹､尼泊尔等国毗邻,西与克什米尔地区接壤,地势由西北向东南倾斜,地形复杂多样,国境线长4000余千米,南北最宽900多千米,东西最长2000多千米,是我国西南边陲的重要门户和屏障｡全区面积120多万平方千米,约占全国总面积的1/8,在全国各省(自治区､直辖市)中仅次于新疆。","region":"西南地区","gbcode":156540000,"lat":"31.6168","population":3002165},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156540000","population":"人口(人)"}},
        {"data":{"area":696623.57,"country":"中国","ename":"Qinghai Sheng","lng":"96.0693","province":"青海省","cname":"青海省","summarize":"　　青海省位于祖国西部，雄踞世界屋脊青藏高原的东北部。因境内有国内最大的内陆咸水湖——青海湖而得名，简称青。青海是长江、黄河、澜沧江的发源地，故被称为“江河源头”，又称“三江源”，素有“中华水塔”之美誉。本省地理位置介于东经89°35′——103°04′，北纬31°9′-39°19′之间，全省东西长1200多公里，南北宽800多公里，总面积72.23万平方公里，占全国总面积的十三分之一，面积排在新疆、西藏、内蒙古之后，列全国各省、市、自治区的第四位。青海四周相邻的省、区，北部和东部同甘肃省相接，西北部与新疆维吾尔族自治区相邻，南部和西南部与西藏自治区毗连，东南部与四川省接壤。","region":"西北地区","gbcode":156630000,"lat":"36.1078","population":5626723},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156630000","population":"人口(人)"}},
        {"data":{"area":1628780.29,"country":"中国","ename":"Xinjiangweiwuer Zizhiqu","lng":"85.5103","province":"新疆维吾尔自治区","cname":"新疆维吾尔自治区","summarize":"　　新疆古称西域，自古以来就是祖国不可分割的一部分。公元前60年，西汉政权在乌垒（今轮台县境内）设立西域都护府，自此西域正式列入汉朝版图。清乾隆后期改称西域为新疆，1884年正式建立新疆省。1949年新疆和平解放，1955年10月1日成立新疆维吾尔自治区，首府设在乌鲁木齐市。","region":"西北地区","gbcode":156650000,"lat":"40.8415","population":21815815},"heads":{"area":"面积(平方千米)","country":"国家","ename":"英文名称","province":"省","cname":"中文名称","summarize":"概述","region":"地区","gbcode":"156650000","population":"人口(人)"}}
    ];
    /**
     * 判读ie
     * @returns {boolean}
     */
    function isIE() { //ie?
        if (!!window.ActiveXObject || "ActiveXObject" in window)
            return true;
        else
            return false;
    }
    /**
	 * 加载行政区划信息
	 * @param curData 	  当前节点的数据
	 * @param checkedData 行政区划专题选择
	 */
	function loadDistrictInfo(curData, checkedData){
		currentNode = curData;
		checkedNodes = checkedData;
		subjectType = currentNode.subjectType;
		var gbcode;
		if(subjectType == '1'){
			gbcode = '000000000';
            if(isIE()) {
                map.setZoom(2,{animate:false});
            }else{
                map.setZoom(2);
            }
		} else {
			gbcode = '156000000';
			map.setZoom(4);
			addTips();
		}
		// 事件注册
		eventRegister();
		//根据GBCODE请求子行政区划数据
		getBorderInfos(gbcode);
	}
	
	/**
	 * 添加双击进入下一级提示框
	 */
	function addTips(){
		// 提示框不存在情况下，添加提示框
		if($('.dlbtips').length == 0){
			var tpl = T['dbl_tip'];
			$('#app').append(tpl);
			$('.dlbtips .tabtop_rt').on('click', function(){
				$('.dlbtips').remove();
			});
		}
	}
	
	/**
	 * 事件注册
	 */
	function eventRegister(){
		// 点击地图绘制专题图
		map.on('click', mapClickFunc);
		// 地图级别发生变化事件
		map.on('zoomstart', mapZoomStartFunc);
		map.on('zoomend', mapZoomEndFunc);
	}
	
	/**
	 * 地图点击事件
	 */
	function mapClickFunc(evt){
		var zoom = map.getZoom();
		var latlng = evt.latlng;
		var postData = {"lng":latlng.lng, "lat":latlng.lat, 'level':zoom};
		// $.ajax({
		// 	url:'./zhfw/gbcode',
		// 	data:JSON.stringify(postData),
		// 	dataType: 'json',
		//     contentType: "application/json",
		// 	type:'POST',
		// 	success:function(result){
		// 		var gbcode = result.parentGbcode;
		// 		// 全球数据除外
		// 		if(gbcode == '000000000' || !result.lnglat){
		// 			return;
		// 		}
		// 		var center = L.latLng(Number(result.lnglat.split(' ')[1]), Number(result.lnglat.split(' ')[0]));
		// 		map.setView(center);
		// 		getBorderInfos(gbcode);
		// 	},
		// 	error:function(){
		// 		throw '根据经纬度获取gbcode失败';
		// 	}
		// });
	}
	
	/**
	 * 地图级别变化前
	 */
	function mapZoomStartFunc(evt){
		zoomBefore = map.getZoom();
		$('#app').children('.property_popup').remove();
	}
	
	/**
	 * 地图级别变化后
	 */
	function mapZoomEndFunc(){
		zoomAfter = map.getZoom();
		// 如果是第2级别
		if(zoomAfter <= 2){
			if(geoJson){
				map.removeLayer(geoJson);	
			}
			if(layercache['000000000']){
				map.removeLayer(layercache['000000000']);
			}
			if(layercache['156000000']){
				map.removeLayer(layercache['156000000']);
				clearGbGeojson();
			}
			// 只有一个节点被选中
			if(checkedNodes.length == 1){
				// 选中的是全球行政区划
				if(checkedNodes[0].subjectType == '1'){
					map.addLayer(layercache['000000000']);
				// 选中的是中国行政区划
				} else {
					map.addLayer(layercache['156000000']);
					// 添加国界
					addChinaBorder('156000000');
				}
			} else {
				// 排序
				if(checkedNodes[0].subjectType == '1'){
					map.addLayer(layercache['156000000']);
					// 添加国界
					addChinaBorder('156000000');
					map.addLayer(layercache['000000000']);
				} else {
					map.addLayer(layercache['000000000']);
					map.addLayer(layercache['156000000']);
					// 添加国界
					addChinaBorder('156000000');
				}
			}
			return;
		} 
		
		if(zoomAfter > 2){
			if(layercache['000000000']){
				map.removeLayer(layercache['000000000']);
			}
		} 
		if(zoomAfter > 6){
			if(layercache['156000000']){
				map.removeLayer(layercache['156000000']);
				clearGbGeojson();
			}
		}
		
		// 地图缩小情况,需要重新绘制统计专题
		if(zoomAfter < zoomBefore){
			// 由市级缩成省级
			if(zoomBefore >= 7 && zoomBefore <= 8
					&& zoomAfter >=4 && zoomAfter <= 6){
				provinceGb = undefined;
				getBorderInfos('156000000');
			}
			// 由县级缩成市级
			else if(zoomBefore >= 9 && zoomBefore <= 11
					&& zoomAfter >=7 && zoomAfter <= 8){
				if(!provinceGb){
					return;
				}
				cityGb = undefined;
				getBorderInfos(provinceGb);
			}
			// 由镇级缩成县级
			else if(zoomBefore > 11
					&& zoomAfter >= 9 && zoomAfter <= 11){
				if(!cityGb){
					return;
				}
				getBorderInfos(cityGb);
			}
		} else {
			// 由省级放大到市级,由市级放大到县级
			if((zoomBefore >= 4 && zoomBefore <= 6
					&& zoomAfter >=7 && zoomAfter <= 8)){
				if(provinceGb){
					return;
				}
				clearGbGeojson();
				clearDistrict();
			} else if(zoomBefore >= 7 && zoomBefore <= 8
					&& zoomAfter >=9 && zoomAfter <= 11){
				if(cityGb){
					return;
				}
				clearGbGeojson();
				clearDistrict();
			} else if(zoomAfter > 11){
				clearGbGeojson();
				clearDistrict();
			} 
		}
	}
	
	/**
	 * 清除行政区划边界信息
	 */
	function clearDistrict(){
		var zoom = map.getZoom();
		if(zoom > 2 && geoJson){
			map.removeLayer(geoJson);
		}
	}
	
	/**
	 * 获取行政区划边界信息
	 * @param gbcode   父行政区划代码
	 */
	function getBorderInfos(gbcode){
		// var postData = {'gbcode':gbcode, 'type':'s'};
		// $.ajax({
		// 	url:'./zhfw/border',
		// 	data:JSON.stringify(postData),
		// 	dataType: 'json',
		//     contentType: "application/json",
		// 	type:'POST',
		// 	success:function(result){
		// 		if(result.geodata){
		// 			var regions = JSON.parse(result.geodata);
		// 			for(var f in regions.features){
		// 				regions.features[f] = L.GeoJSON.Encoded.prototype._decodeFeature(regions.features[f]);
		// 			}
		// 			// 绘制行政区域
		// 			drawRegions(regions, gbcode);
		// 		}
		// 	},
		// 	error:function(){
		// 		throw '根据gbcode获取行政区域数据失败';
		// 	}
		// });

        var regions = {"type": "FeatureCollection", "name": "\u4e2d\u56fd", "features": [{"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["ur_vCitujTvqTxyQvkn@ikXtf_@pf[~ul@gkDjfb@f{\\vjb@`uy@xfv@r{VhwwA~c@`_n@fdz@vxPdtz@|ar@fwCjy\\bfj@wbCr_W|yh@e~@l{L|}]bvEz_w@zta@xaErfNfb_@rnPbjg@vhRrejAi`c@haE_hH|m_A}lLtvc@fj\\xih@`iAthuA{|TfnQbsHvkc@~f@dwv@idh@tty@ihPxgCkmTvq~@wz~@t_NkxXvnR}bUgz[qhm@koLwpTxq`@`bJzy~@ioUtxMhaIfs_Agtq@fk_A}~Ve~Heri@c}s@buG{{f@{gcAalWmcw@bwe@jfQdr]xtAz`cAu_\\`lr@ws^rgEodUfu[q\\hw}@mmPrlg@kie@aq@xzL}zRkyBsai@c~Selc@_rg@era@tkN_am@~_TsdIjePeas@xtFeku@acNouWaab@py@crNw_u@ia^}|n@wxAu|h@ucOeeUey^hrH{jVm}RloIanp@zbx@}gc@knDw|o@f}VauFyfVekbAmlYgbBwi_@eka@|Bad@pqQ{mOm{Asta@uub@{x^d{Noed@_da@hMjA_V_CyYa{GkpVzgKaoi@cy|@mrc@n}Fg}y@}ah@s_c@~z]miQpv@kma@}df@_t{@msPqhIb_J{ce@qeFuix@t{E{|c@xd|@v`PbqMczc@uC}k@bc_@ljO`}v@hvBl_\\`gc@tvm@vl\\vxO{{F|`@`Nd_Ce_@~@eA~Et@ueKkeTwMt@uo]_u`@daZkpe@h|~@fhG|wF{tZ}zX_kTvmF_xaA"]]}, "type": "Feature", "properties": {"lat": 23.8252, "lng": 108.791, "CNAME": "\u5e7f\u897f\u58ee\u65cf\u81ea\u6cbb\u533a", "ASCRIPTION": "", "GB": "450000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["subzCohazUjeBreAmyEhkNipFjtAatXap@{nKmdS|bZqnBjeUv|C"], ["q{mkDehxsUzj|Bmd]vhQvzEvyQ{}kAsrj@mrl@muCaeYxjm@anIpjYupXc~YuorAzyEaiQdvl@owQnwKbw^~qb@laGnmZvvUyqF`pSwaFzh_@pdFvi[`|c@zj\\p_j@k_i@fzk@`rBzv_@poDzeThmPxd}@vtFbjc@ljMmbXr{[zjOn`i@vk`@}ne@vd[bvc@`~RvxXdzKpzTdhsAp`{@keR`pTdsKn~a@upNbq^pgf@hbVnln@bqIpa^~lO~|\\|~z@`aXby^|dCz~]rxUjyNmxLvbYaecAleV_r`A|bFmsa@fm[o_YkyBhnMrmo@eni@bw\\lnDlwWki[tceAybt@|dFalTov\\ufhAseIqupAcyrAihWngS}r`@yeYgjxAomH{oWune@kMUcJuEoCwD{hJgkf@gzb@ahb@wtrA~dTso@{uXkxx@wcaAzsTkgRh}Ccu_@g~SqhNmlZ}{_Bchf@wyNhyEmu}@"]]}, "type": "Feature", "properties": {"lat": 26.0758, "lng": 117.977, "CNAME": "\u798f\u5efa\u7701", "ASCRIPTION": "", "GB": "350000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["u_}lDaz|ySb~b@FhrEegR~v}@|{LjegAqa\\hx^rh]`yOhpd@dxj@nci@i_Gm}eBhpQkmSp_x@djCphMbrg@nl^szU~ll@xyWd|Io}]fxh@u_Hby|@lrc@{gK`oi@`{GjpV~BxYkA~U~ca@iMe{Nned@tub@zx^l{Arta@qqQzmO}B`d@vi_@dka@llYfbBxfVdkbAg}V`uFjnDv|o@{bx@|gc@moI`np@zjVl}Rdy^irHtcOdeUvxAt|h@ha^||n@brNv_u@`ab@qy@`cNnuWytFdku@kePdas@_`TrdIukN~`m@~qg@dra@b~Sdlc@jyBrai@yzL|zRozr@scc@cux@bxGgcaApjdAwnXqgOe`_B{h[qjU{jZsyi@fbV}eIvouApfXnpKmoMnfx@mav@cl@}_u@htJk{s@}wh@zf\\yqo@gtf@yza@di]mfn@olGquh@flKqfK}sWo_e@fnBsk[}|z@qsQg}TqqhEwt|@v|XvdAl}~@mbcA~vs@gmw@{feAt_m@m`nAu^ilTqlc@eoDvgIovXexk@wpqAjtVsv\\wwM}__@er`A}oBsqC_~`@rwn@uuv@i_Wq~g@trFokk@tgTecIbfr@mVjcJwyu@frVdnJ~vLyzf@`xVb`Bnd[mlm@wa`Ayit@"]]}, "type": "Feature", "properties": {"lat": 26.824, "lng": 106.877, "CNAME": "\u8d35\u5dde\u7701", "ASCRIPTION": "", "GB": "520000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["chokD}z}|QnmTmlVmclA_Bquy@uo|@xcdBshwAphb@p{[~ap@}|[pja@mv]gvf@u~cAbynD_}wAjsViuYltBk~PdfUcx[x{^z_Ipc[}eMvvi@gd^ddYwmj@vdGmmd@ix\\ax[a`[uf{@~eDeuKftD}_AzfFa|RizNqto@ied@mxKqsw@zuOaiTfrNi~]p_Bcye@u{@m}Vgkq@cghAwtbAk}_@mtDuq]fbLofZaac@{wGivm@eri@|fQma[qfMpdGminBvccBkuCnjLxn\\~gZil`@hmJiwUalQgl`Amr]q{YnxRanh@juw@c_F||z@psQgnBrk[|sWn_e@glKpfKnlGpuh@ei]lfn@ftf@xza@{f\\xqo@j{s@|wh@|_u@itJlav@bl@loMofx@qfXopK|eIwouAryi@gbVpjUzjZd`_Bzh[vnXpgOfcaAqjdAbux@cxGnzr@rcc@jie@`q@lmPslg@p\\iw}@ndUgu[vs^sgEt_\\alr@ytA{`cAkfQer]lcw@cwe@zgcA`lWcuGz{f@dri@b}s@|~Vd~Hqve@`ei@tyV`cSxu\\hppA|u^aqJh`XfkXybDhz]fw\\dsa@qrThov@dqz@z}\\qrw@t}}@pbf@x_Uq`c@dmg@p~_A~to@whFhbZmkWblMsi]j_mAt|z@x_h@bL|ck@j_Lpy]kdNhkd@|hm@r~Vx{t@kuOlrY}rYlpd@qaK`ut@|ySnrg@skE_zTpal@jlNron@iitBhoe@vmPrdg@vj`@jf]b}Klm\\qwPh_\\tmM`rb@a}o@xir@mfq@k`Bkn^|beBvdG`sUibOv{b@}slAiyg@ova@zxJab\\e|g@ssb@dqCelGbt\\fjEj|n@wfRp_l@{wUm|Jmlv@~gKay}@f`f@uvi@o_a@pMp}{@l_Jnk`Bvvj@`tmA{}M`wTqsd@sqe@ym`@e_Aw}^vuLbfB~hXoav@gwD}jVwtXiga@moBwiq@{tVf|HigT{b_AefdAgwJmsSy_f@wuO{ihAabn@}ewBaeDiioAf|K_pcAgp@}iSvvq@f~Z~|Wu}_@t_OefwA`qQkaRoqWboWmfW}mUqb~@o~Sq`Ge~_Aha^saKedPufn@d{Hg^qnx@cbk@sxHmfBwvY`}mA`dAhukAilKh|^itU"]]}, "type": "Feature", "properties": {"lat": 24.2677, "lng": 101.862, "CNAME": "\u4e91\u5357\u7701", "ASCRIPTION": "", "GB": "530000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["iwlrDaqjpUlqi@xd^tj`@amJhaPywa@rum@yo^lxi@i_F|o`@npEbhf@vyNllZ|{_Bf~SphNi}Cbu_@{sTjgRjxx@vcaAro@zuXvtrA_eTfzb@`hb@zhJfkf@nCvDbJtEjMTzoWtne@fjxAnmH|r`@xeYhhWogSpupAbyrAtfhAreI`lTnv\\xbt@}dFpoMzoTtvx@aO{dIhzh@sy`@v{]nmx@tn|Dca_@rs_@oiLygDedn@isVay[}k{@wrSy`BonJpfBe}Xhjd@v`Xtmn@p~Afxk@{z_@xcWov]qmF_|R|oLqld@kiUcxgA_Ewh{@kgNa{Fzdf@edd@|xL{hVe~K{of@bpWirn@kvIviA|lk@gbc@fpCijp@g~b@oof@goQ_zIunc@{jr@alg@yra@tlJ}eJnhTc_g@swLewv@`|h@qxx@o{|@d}B{}p@e|NuhdAec^wzTzuIe}Z{sZ{zSn]{`Xo{d@mt\\m}@up]doW{ey@a`Rkh`@~vF_hVwiXmgy@qyX{gEqsAii^`z[ym\\pgh@ttk@diXie`@ocZmcr@o_VvsDygPaua@twp@cbu@`nUscd@bk@_kjAvyZwvP"]]}, "type": "Feature", "properties": {"lat": 27.6172, "lng": 115.725, "CNAME": "\u6c5f\u897f\u7701", "ASCRIPTION": "", "GB": "360000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["_|hpDsglvTdwv@a|h@b_g@rwL|eJohTxra@ulJzjr@`lg@~yItnc@nof@foQhjp@f~b@fbc@gpCwiA}lk@hrn@jvIzof@cpWzhVd~Kddd@}xL`{F{df@vh{@jgNbxgA~Dpld@jiU~{R}oLnv]pmFzdUdjX|Gtwf@afc@j_fAdtXt_w@j`Hl~S|iPkwAtI}vVf|p@yrAhpQlij@sjb@fyK{|TvtcAl{Bbp`@rwb@pyL~oYczGvfUryZwmF~waA|zX~jT}wFztZi|~@ghGeaZjpe@to]~t`@vMu@teKjeT_Fu@_AdAe_Cd_@}`@aNwxOz{Fuvm@wl\\m_\\agc@a}v@ivBcc_@mjOtC|k@cqMbzc@yd|@w`Pu{Ez|c@peFtix@c_Jzce@lsPphI|df@~s{@qv@jma@_{]liQ|ah@r_c@o}Ff}y@gxh@t_He|In}]_ml@yyWol^rzUqhMcrg@q_x@ejCipQjmSh_Gl}eBexj@oci@ayOipd@ix^sh]kegApa\\_w}@}{LirEdgRc~b@Gu`gAz}Fyza@}tOs_Nl~OctnAwne@cdRujRnrByxa@}p\\snMudEu{`A|s]sup@qzWccr@grq@v`[gsRwgu@t`Jki^bpCw{{@ji[mk{@a_Do{b@vhL{`b@fu{@c}wA}sPkhLzwF{oh@g~_@}|u@fd]p|Bjy]qol@}pm@oji@nS_{y@ppQq|Mh|`AnkXfd_@gxMduFqdq@"]]}, "type": "Feature", "properties": {"lat": 27.6127, "lng": 111.711, "CNAME": "\u6e56\u5357\u7701", "ASCRIPTION": "", "GB": "430000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["ifwuDccqiVnOn{FmtJpyp@udJztGkoPy{BchAklSxzH{oX`|Oa~SfjNdlC"], ["oo|wDsw_iVfiKfz@{cB`eL}aF|mM{|DeoEmeCcxL~fAg{EzxDuiA"], ["idg}DmbxzUvpk@oen@qw@cuk@~nd@kbYaqq@ollAl}c@a|ZreZ_ok@tzSb_l@j`g@zuVxsd@waA_xa@_~q@`ePocu@`st@wch@toW}_aAvoQlpNvk~@itHv{x@hyYigJzu{@d}y@sy_@r}d@pbKr}Jv}WdcgAqrWkoFtca@|n_@jrNog`@|y_@jth@fhf@rzgBxroAlk]uzFlrq@z|g@evl@nwQ{yE`iQb~YtorAqjYtpXyjm@`nIluC`eYrrj@lrl@wyQz}kAwhQwzE{j|Bld]iyElu}@}o`@opEmxi@h_Fsum@xo^iaPxwa@uj`@`mJmqi@yd^c`We`z@imWiw\\y_aA_gp@wb`AvyB}zGaoMjqLodo@{bQkg`@}b\\fwGkdx@wqk@enz@epLarF_`u@"]]}, "type": "Feature", "properties": {"lat": 29.1792, "lng": 120.067, "CNAME": "\u6d59\u6c5f\u7701", "ASCRIPTION": "", "GB": "330000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["w~k`EodpfVjga@uiY`st@|aVf|cAwhYv|JfkrAd~Xvku@seZ~nk@m}c@`|ZylVnjByhCs~d@}zw@qnR_{I}x]obh@xwk@}a_@qvh@lce@ewaB"]]}, "type": "Feature", "properties": {"lat": 31.254, "lng": 121.463, "CNAME": "\u4e0a\u6d77\u5e02", "ASCRIPTION": "", "GB": "310000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["aat`Egpy{Sta\\_j^z~Icua@tti@wym@ruh@npGjsa@{bEzeAroo@jhcAfzhBhrChah@gaRdub@xeVxcWo}F~l[bjLlmv@llj@qv_@||gAzkKrrBsmO~sg@olZzlC_a[h{z@inEcmMil[x~b@yuGjzQq{Vr_Nm~Oxza@|tOt`gA{}Fva`Axit@od[llm@axVc`B_wLxzf@grVenJkcJvyu@cfr@lVugTdcIurFnkk@h_Wp~g@swn@tuv@rqC~}`@dr`A|oBvwM|__@ktVrv\\dxk@vpqAwgInvXplc@doDt^hlTslaAlrVquLz}wAaeeAh`OteBfvm@ca`@~q\\u`^jWgnq@mdpAuu_@q`AanXtah@ylt@okv@||q@yjqAagZqp|@fpw@wda@eeCeeaAkxrBwnuAede@xpEo~Eem{AgywBkbm@qw`@ihdAmiz@rxv@upl@}zo@|ei@sukAxmTwqr@`d_@{jYqdBamv@"]]}, "type": "Feature", "properties": {"lat": 30.0628, "lng": 107.877, "CNAME": "\u91cd\u5e86\u5e02", "ASCRIPTION": "", "GB": "500000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["_t}iEonldTzqYwcc@`vp@qfTj{s@w|w@aiB{zYr~R_n^lva@}ssAugNsql@|tJimj@{jIauStgCuwn@iaJs`Qvu^{hi@yuPacc@xmS_sWrcpAqxVjfPcssAk|@mjx@`qb@uiJbsVsdc@qcZqox@x{\\exOfuFsz^rgr@weh@wvIa~Wb~c@}g}@|zZd}^dfb@|mSje`@mu]~nYxwEhb_@yx`@~tkAggN``Rjh`@eoWzey@l}@tp]n{d@lt\\o]z`XzsZzzS{uId}Zdc^vzTd|NthdAe}Bz}p@pxx@n{|@euFpdq@gd_@fxMi|`AokXqpQp|MoS~zy@|pm@nji@ky]pol@gd]q|Bf~_@||u@{wFzoh@|sPjhLgu{@b}wAwhLz`b@`_Dn{b@ki[lk{@cpCv{{@u`Jji^fsRvgu@frq@w`[pzWbcr@}s]rup@tdEt{`A|p\\rnMorBxxa@bdRtjRbtnAvne@kzQp{Vy~b@xuGbmMhl[i{z@hnE{lC~`[_tg@nlZsrBrmO}|gA{kKmlj@pv_@cjLmmv@n}F_m[yeVycWfaReub@irCiah@khcAgzhB{eAsoo@ksa@zbEsuh@opGuti@vym@{~Ibua@ua\\~i^srPanIqlmAloNgAtAqt`@`bJedg@o{VoyB{laBgpi@xmD{jGhgy@kB~[kwXzf@cFZmrq@`_`@cGmGjgTe~qBguB}jq@h}Oc`n@cn]gbv@"]]}, "type": "Feature", "properties": {"lat": 30.9729, "lng": 112.278, "CNAME": "\u6e56\u5317\u7701", "ASCRIPTION": "", "GB": "420000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["yiukEckdlRsOd]QyQl@cJvNG"], ["yiukEckdlRxoQot`@rva@|{a@``[eiJurSo}iAqx|@ens@gpqAdbbAenTakeBqpm@uxo@tnl@ows@l{s@rdC`~e@ardEt~f@c~Hp|Rm_Ofzv@{gWrec@twWdgm@gc}CkuZ}xaAuzZfcM}hE{aV|eh@cjRag_@qtuA`_[{xL`mSsqw@_wVki_Ah|@}{t@rvMcrP|xVzlDtpVgn`@_qW}dd@bcJksRb{KqiUjfs@sz_AejVksu@w]igh@npLcuFtpl@|zo@liz@sxv@pw`@hhdAfywBjbm@n~Edm{Adde@ypEjxrBvnuAdeCdeaAgpw@vda@`gZpp|@}|q@xjqAxlt@nkv@`nXuah@tu_@p`Afnq@ldpAt`^kWba`@_r\\ueBgvm@`eeAi`OpuL{}wArlaAmrVu_m@l`nAfmw@zfeAlbcA_ws@wdAm}~@vt|@w|Xf}TpqhEkuw@b_FoxR`nh@lr]p{Y`lQfl`AimJhwU_hZhl`@ojLyn\\wccBjuCqdGlinBla[pfMdri@}fQzwGhvm@nfZ`ac@tq]gbLj}_@ltDbghAvtbAl}Vfkq@bye@t{@h~]q_B`iTgrNpsw@{uOhed@lxKhzNpto@{fF`|RgtD|_A_fDduK``[tf{@hx\\`x[wdGlmd@edYvmj@wvi@fd^qc[|eMy{^{_IefUbx[mtBj~PksVhuYcynD~|wAfvf@t~cAqja@lv]_bp@||[qhb@q{[ycdBrhwApuy@to|@lclA~AomTllVi|^htUiukAhlKa}mAadAqgtAbqVqws@i{Mwz~Cnr]a~o@`dTow]fgXcbQuzRc{W_rTomxAd`{Ayga@_mB}g`A`{h@qac@|c~Aws`@hjz@gwf@~cN_m`B{ynA}nf@z_bAcui@tdHq~Qevs@o~v@}q`@`aW}bsBnh|Cm~cAlcmAunbB|}\\mfyA}x}@qg`@hoc@kah@fhd@xpC~dKgzWc`\\{wb@f_l@ezr@{w\\arCog@em`B{lhB|jJhiVs~aBcgsA{bZ"]]}, "type": "Feature", "properties": {"lat": 30.6286, "lng": 102.697, "CNAME": "\u56db\u5ddd\u7701", "ASCRIPTION": "", "GB": "510000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["gq_}DmabyUdnz@dpLjdx@vqk@|b\\gwGzbQjg`@kqLndo@|zG`oMvb`AwyBx_aA~fp@hmWhw\\b`Wd`z@wyZvvPck@~jjAanUrcd@uwp@bbu@xgP`ua@n_VwsDncZlcr@eiXhe`@qgh@utk@az[xm\\psAhi^pyXzgEviXlgy@_wF~gV_ukAfgNib_@xx`@_oYywEke`@lu]efb@}mS}zZe}^c~c@|g}@vvI`~Wsgr@veh@utm@wbSkeYccf@~Pkwg@ufkA}vIizdA~rRnkR~dx@scVdeSivH~wn@urr@dZicNd|o@wkf@`cFrzJe~f@{lM_fd@wvz@e_CajUkzYa`Bexa@yyqAdfHgjJyve@~zJym_@njy@wef@eqM_bm@iyc@eeq@oe`@jpUea\\yiBldCr{a@}vc@bth@maVycFo_Lgia@h|o@mwxAvOwwYnkm@_cNhcOim[oyBih^p}L{ls@ver@cjUvdCe|rA`gtAtpb@tq]ewOeqJ}zZjev@eeCbpe@uwZoe@cz_Asfl@sxZdEqm`@jlXi`_@f~n@syE`oWbl[q}[hwo@dvYfvXt|h@lcBddMddb@~pVtzT|snA{qq@npFy}j@lo_@qqAl}Vnm^fdQ_sMyhHicdAtr[wr{A"]]}, "type": "Feature", "properties": {"lat": 31.8236, "lng": 117.232, "CNAME": "\u5b89\u5fbd\u7701", "ASCRIPTION": "", "GB": "340000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["w~k`EodpfVmce@dwaB|a_@pvh@nbh@ywk@~zI|x]|zw@pnRxhCr~d@xlVojB`qq@nllA_od@jbYpw@buk@wpk@nen@`rF~_u@ur[vr{AxhHhcdAgdQ~rMm}Vom^mo_@pqAopFx}j@}snAzqq@_qVuzTedMedb@u|h@mcBevYgvXp}[iwo@aoWcl[g~n@ryEklXh`_@eEpm`@rfl@rxZne@bz_Acpe@twZkev@deCdqJ|zZuq]dwOagtAupb@wdCd|rAwer@bjUq}Lzls@nyBhh^icOhm[okm@~bNwOvwYi|o@lwxA}zn@{sLecH_xpArhm@_mi@hlr@cjQgnYqvk@vzSyed@iac@mmg@}bEuw\\zfYgnl@fx^fxAi`H_yl@_pl@g}IiwEetv@cndAcgb@}fEkqhAxhGpeOjzg@hbCjmfAytqBdaGsqk@zhXmhs@v`b@qmGdmrAm`o@zheByms@xxqB_e`@rw\\kwfAjso@u{Flfi@gsoAxxd@elRtiNhfS"]]}, "type": "Feature", "properties": {"lat": 32.263, "lng": 120.535, "CNAME": "\u6c5f\u82cf\u7701", "ASCRIPTION": "", "GB": "320000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["ees{Eqcy_Ulhw@hfEmw[uvbAvmHy`Tnaf@h{h@`vInsh@t|v@|yn@|j@xi\\~x_Ahiq@~gT{hRkbE}l\\f`a@qc`Abbo@_aU`qCsv^wyB}gcBlaVxcF|vc@cth@mdCs{a@da\\xiBne`@kpUhyc@deq@dqM~am@ojy@vef@_{Jxm_@fjJxve@xyqAefH``Bdxa@`jUjzYvvz@d_CzlM~ed@szJd~f@vkf@acFhcNe|o@trr@eZhvH_xn@rcVeeSokR_ex@hzdA_sRtfkA|vI_Qjwg@jeYbcf@ttm@vbSguFrz^y{\\dxOpcZpox@csVrdc@aqb@tiJj|@ljx@kfPbssAscpApxVymS~rWxuP`cc@wu^zhi@haJr`QugCtwn@zjI`uS}tJhmj@tgNrql@mva@|ssAs~R~m^`iBzzYk{s@v|w@avp@pfT{qYvcc@sz~@g`AcrOlv^ivpC~joAuH~Nsxd@`dHcvAu`xA}ed@ur|@iqEuppAma[wtQ{jQett@xkFisTc`m@qwEhuM}wbCi~WsdfAczc@{deAiaU_gQe_lC}_^zoOev_Abw@ihd@`bZm}fAuiBssv@alKgze@t{Uuok@e~Jq_["]]}, "type": "Feature", "properties": {"lat": 33.8794, "lng": 113.613, "CNAME": "\u6cb3\u5357\u7701", "ASCRIPTION": "", "GB": "410000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["cph{E}ipbP`uLdtm@ftShxGzmL_nl@r|XguNn{n@oBxuYp~j@`mWh_Glhe@ebQ|J_BnrU{zAqlDg~f@|pRwpKrtd@tdIhsy@uoLh}]~bIbdMtl^fxYqfEhw^m_o@p}~@sz]b`^odn@n|`@eagA|lDidzCvmw@efyA}rK_kb@|hX_tJzdJcqcCsoCciRFwLouAogGrJe@tvRmvFc~Doya@vmc@sgx@kpP{`VrlBkt`@zeUeg|@y`OmyJohXoiuAd{k@yot@beDaq{@lnrAk{Zj|]ksPxsIug~@uiLgnVjjMsbYd_@qUthG{eSmtj@u}[bBwa@dfg@g_t@aMobt@ims@b~Qee@aFon@sQgIhAyAx@oDpBszC|oAqCsFKWdvD_t[uJoPyEeL}BoF_FqeDdDiUuuCu{o@uus@uhYWuhUa`p@xqFzqBurdApac@}c~A|g`Aa{h@xga@~lBnmxAe`{Ab{W~qTbbQtzRnw]ggX`~o@adTvz~Cor]pws@h{MpgtAcqVlfBvvYbbk@rxHf^pnx@tfn@e{HraKddPd~_Aia^n~Sp`G|mUpb~@coWlfWjaRnqW_mj@bxk@wpa@~_bAzewA|qp@p~MqoR`df@``fAyt]halAajd@xwk@yaLnf\\jhEd}w@_qRzcUj_YtesAfxk@rd^jz`A`esCp_Cfqp@fimAplnArt]jvGlsL~}f@~cKf~jBg`L~kkAfzRbu`B_dr@trZgz|@u~AcnSj~uAmg_@ezEovf@~iFsh]jkv@dgf@~mu@wyg@huz@|yGvkYahG~}h@skW|sh@lmI~gVg_S`bi@xsMbyj@`|w@xel@xmMdjY~r~@tgZpdRk|Nnf\\rng@wvm@fnd@u{qAciSsbWpyGypQfai@htWvvg@|hF~dk@n|MtpMukOlxu@rg[zhRarH|f\\xhCvwxAe}q@tlhAgn@rj[vhe@hk^mrMdbi@doLdlk@sxs@~l\\apVlnc@|pCnev@u`L|et@_tt@}}PkxJ||Y~sTdvf@kg_@ttk@et]xemAs_\\wgBeem@tgW}nCtuz@hvZnbc@kaZv`c@uqu@frc@mzWzc~@saDjo`@eoj@b~e@czV~i}@{}n@xho@qbWz}eAp}Cp{j@jhh@rkArx^pfWep@pcb@k}d@fxJayKzqe@op]fjk@k`Ix|q@ebUjq{@mh{@xju@ylObxsA|eMjwRqjPx|h@czSrdBywh@v~m@qfn@ioQi|i@xke@syRgmVcdj@jj|@_l]ysI{{l@|oUcx_@ghcAvos@upKlsRom^ytb@a|u@apNicGmjbAdyFi{j@vkPwt\\zqYisSpfd@{zm@|u]}pIcpOguu@|~Bog`Aaax@qcLleDqjNi_xCgc_Bkyk@_la@yjg@yhl@imM{dKooUn{Rqjr@`~Dqrw@kyP{fX`fLyoSpDq~l@`_RovLcbFc`pAed]uwRqbVotv@c}^sqR`zL}`~@iuE}tk@d~XyY|`Zi~[atCi}VtlN}ky@u|L{ybBrbJkmTaiU_~w@_`NdYgoMch|@k|Twjl@ocIe~t@d`P_fRduHyon@yoNo{FshHoxx@w_LoqTy_w@mrX}{TmmbBgkH}{uA{wWmdk@`yNqed@y}Gkf`@exQ_`pCvb[wz~@e}CyxWfcTuue@inFyrSpq\\{ev@zhHcme@"]]}, "type": "Feature", "properties": {"lat": 31.4899, "lng": 88.4464, "CNAME": "\u897f\u85cf\u81ea\u6cbb\u533a", "ASCRIPTION": "", "GB": "540000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["}jcuEohcwU|fEjqhAbndAbgb@hwEdtv@~ol@f}Ih`H~xl@gx^gxA{fYfnl@|bEtw\\hac@lmg@wzSxed@fnYpvk@ilr@bjQshm@~li@dcH~wpA|zn@zsLn_Lfia@vyB|gcBaqCrv^cbo@~`Ug`a@pc`AjbE|l\\_hTzhR_y_Aiiq@}j@yi\\u|v@}yn@avIosh@oaf@i{h@wmHx`Tlw[tvbAmhw@ifEgcaA|lg@sgt@swf@ycIkgf@etq@sec@wws@k~V}dCm|o@krg@gyNjoQicVqgfAeghAghAqqxBuui@m{[wf@qfWonc@mxZl|Sewg@d`KaluAulFonkAvdj@clf@|yf@iNdyNrlV~~f@hnJvzTgcGxfd@yieAcNs}sA{nTi}X}_^iiJwjQw_k@cfr@y`v@uvMedt@dx@cxi@xqh@uef@tbLcax@hpQcfY}qDaibAn~Dg~n@~xEm{qA`kaArzUljO{wMjfZjvb@i_XtzaA~uOxqp@dkUxw^p}@lff@pmf@bgsAdgS~eCe{@|_f@lbZrnQryb@g}BnfOhso@exW|pIkiCdbf@j~w@juHrir@p}v@`}K~q`@hmm@xfWrkMvfWfuc@d}T"]]}, "type": "Feature", "properties": {"lat": 36.3457, "lng": 118.14, "CNAME": "\u5c71\u4e1c\u7701", "ASCRIPTION": "", "GB": "370000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["_kbnF}jcqQp`kA{sqC}oSiq]ux[e~FtvS{zu@ch]wzm@fdx@{nnA|{IadX|si@qgg@tyl@u{cBall@hu@f~M{ka@h{UqgO~vOitrAjdk@}z[x}Kisf@xi]msq@ocFidm@ry`@goi@klM_nX~ln@qza@djgAevcBt`Ftv\\pcWleCtx^qgm@npa@etBzdv@e_WlkHafWpfe@jqJ~ep@k_GcaDfs_@xqPpcRtpe@kqUpYtfz@rp`Bduf@tzb@jieAltr@r{AvpWejm@ttTevK|vt@vfs@gfC|w_@qy_@p|kBe|Mdz_A|ff@riXpuv@sdl@fvGid\\dh^wgOb|BkzdAht^snE}`Fyq[QyQl@cJvNGbgsAzbZiiVr~aBzlhB}jJng@dm`Bzw\\`rCg_l@dzr@b`\\zwb@_eKfzWghd@ypCioc@jah@|x}@pg`@}}\\lfyAmcmAtnbBoh|Cl~cAaaW|bsBn~v@|q`@p~Qdvs@bui@udH|nf@{_bA~l`BzynAfwf@_dNvs`@ijz@{qBtrdA``p@yqFVthUtus@thYtuCt{o@eDhU~EpeD|BnFxEdLtJnPevD~s[JVpCrFrzC}oAnDqBxAy@fIiAnn@rQde@`Fhms@c~Q`Mnbt@efg@f_t@cBva@ltj@t}[uhGzeSe_@pUkjMrbYtiLfnVysItg~@k|]jsPmnrAj{ZceD`q{@e{k@xot@nhXniuAx`OlyJ{eUdg|@slBjt`@jpPz`Vwmc@rgx@b~Dnya@uvRlvFsJd@nuAngGGvLroCbiR{dJbqcC}hX~sJ|rK~jb@wmw@dfyA}lDhdzCo|`@dagAc`^ndn@q}~@rz]iw^l_o@gxYpfEcdMul^i}]_cIisy@toLstd@udI}pRvpKplDf~f@orUzzA}J~Amhe@dbQamWi_GyuYq~j@o{n@nBs|XfuN{mL~ml@gtSixGauLetm@btAumf@eeb@kiU~jRq{g@vdDmirAxxUc_d@wcR_ct@ktg@beRk}f@ov@cgJrmx@mmh@fsB}{Voq\\m}Ocuq@}m@aua@chtAnci@a{Hbz]e|[ln^qqOzaq@ucqBmeAr}Nd|o@y~Rv~Zu~\\nj@|Rsqw@ot_@koz@ybQwzpBqdKaaZ}pLeqsA{j]czfBcmKohOcdFuzgAxdBwrq@tdk@cz\\soDgzvAhkf@a}ZaxFug`Bd|lAqb^ymIetrBlvU_lZdd@_tp@}uQe~]x|\\ssr@n~Po|~@keh@aseAedp@yu_@|bI{oXymW_qWcjk@pxT{fw@qiClcCqsiA"]]}, "type": "Feature", "properties": {"lat": 35.6684, "lng": 96.042, "CNAME": "\u9752\u6d77\u7701", "ASCRIPTION": "", "GB": "630000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["ajbfFen_pS`zu@tn}@tcq@v_Mdmk@w~@_rG|_PfzG~kw@sxJfsT|sZbkUxss@lxPd{VlrXp{x@oaKrwSg|_AllXydVhjhAjoYs_Cx}~@hlHrqJpvhAshFjsJtrY{|]leRkwd@by{A}s[~wPtlCx}c@ab^bw[mx[yy@svUgc`@i|bAtv\\_zf@|g^kfRw`Yi{d@x_`@a|Gx`h@_n`@pcRj|@pri@ani@_Amr@zpcAk`Pgn[msKwhrBanYonbAdxAwqf@ou\\auk@}w\\obGqpWpxMs|_CowZykeAc`m@{iVonYzH}|j@iqSqyQl~Befe@|qU|c@zdy@cq^rnl@bbp@`xuAzv[h`[ssxA}pEofa@|dLyqZrzYmqNhmOotm@"]]}, "type": "Feature", "properties": {"lat": 37.2838, "lng": 106.159, "CNAME": "\u5b81\u590f\u56de\u65cf\u81ea\u6cbb\u533a", "ASCRIPTION": "", "GB": "640000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["evgoFa_feTh}KexQlyk@poNpqQhq^puYerD`lj@jfXdua@bpErg[nbt@ftO~|Hv@|@|bd@jsBrv{@chf@fC]vc[arPfvVldY?dCbs_@zf@rCLluy@t|l@jBcAf|w@c[nzSiiMpxu@vwDfEs@jhX~bCdocBeg^~v~@v`d@ru@zh@l~{@liVpgDbx@f~r@bkGt|RevZrxd@adHtH_OhvpC_koAbrOmv^rz~@f`Abn]fbv@i}Ob`n@fuB|jq@kgTd~qBbGlGlrq@a_`@bF[jwX{f@jB_\\zjGigy@fpi@ymDnyBzlaBddg@n{Vpt`@abJfAuAplmAmoNrrP`nIpdB`mv@ad_@zjYymTvqr@}ei@rukAopLbuFv]hgh@djVjsu@kfs@rz_Ac{KpiUccJjsR~pW|dd@upVfn`@}xV{lDsvMbrPi|@|{t@~vVji_AamSrqw@a_[zxL`g_@ptuA}eh@bjR|rD_sYoxT_jv@kk^{jDrDyBhb@kcDkf@{AyyXnwj@miRvmA{bj@c~j@j{Jywk@eoL_cq@bpPw_Cv@uC}dKyjTcNkAuj}@h}_@adaAmfXorDem^}ta@lwPsdU~ps@onf@ewl@gug@zyP_rTw~PdyBwioA~~KopSpP?nNaLdHeEdcIqcG}GeDrxC}pjAafIwox@eAaIieC}hGiJj@_ji@jyd@ayPoxNrpK}xi@m{G_x]}OuYyFcetAuxo@msIyEbE{yf@xdPsLrEupmA_ua@{}k@r|JuVuJo}Hfri@_be@leh@k@lA}rDbqe@_MaEqi`@t_dAStBazN|~cAocc@duHemk@v~@ucq@w_Mazu@un}@bcNkx_Ajz[{kU|JoeApRieg@rBw^saJ_xh@vk@myn@uzo@e_CpeAqa\\ePw_@_da@osTem@neBiqRfcT{dk@moUohdA_llAeyVefh@yaB{x@{pXkyPqfYixe@idVaarAaDcVf{Gy~m@y`k@g`m@seL}sl@hnd@_{C"]]}, "type": "Feature", "properties": {"lat": 33.7806, "lng": 108.355, "CNAME": "\u9655\u897f\u7701", "ASCRIPTION": "", "GB": "610000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["ikknFqtkoUp_M`jl@lha@c`Efm_@tql@vfd@`|Bl`Kl`_As~Dfi]inV|bJdbDb|^miMrrXcua@vlF}eVsv\\k`w@}_Dugu@dmMwaMmhQfkMe~m@}kz@p[i}^}cLsl[scb@a^u_^ntr@grl@a`Er{l@joj@vCbre@}w\\zYk_m@`eo@lnOlpSkjc@"]]}, "type": "Feature", "properties": {"lat": 39.2991, "lng": 117.327, "CNAME": "\u5929\u6d25\u5e02", "ASCRIPTION": "", "GB": "120000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["_w{|EocduTd_lC|_^haU~fQbzc@zdeAh~WrdfAiuM|wbCb`m@pwEykFhsTzjQdtt@la[vtQhqEtppA|ed@tr|@bvAt`xAu|RdvZg~r@ckGqgDcx@m~{@miVsu@{h@_w~@w`d@eocBdg^khX_cCgEr@qxu@wwDozShiMg|w@b[kBbAmuy@u|l@sCMcs_@{f@?eCgvVmdYwc[`rPgC\\sv{@bhf@}bd@ksBw@}@gtO_}Hsg[obt@eua@cpEalj@kfXquYdrDqqQiq^myk@qoNi}KdxQqmIwfh@cej@ekTpxDcy}Aw}b@moFanaAgqq@_~]kub@|iXko}@iq^ya_@qiM}teAjdPkpTwgFqbg@{h\\gyo@ejFg|n@mug@imKndhAcd`@vaR}yc@h}P~|qAl|`@nfX|o\\cew@s}@_f`@fog@yZp{Wiz]l~wAdyg@hgDtfk@iwNzfMbt\\nzu@~j_@ipO`bq@dgy@n{w@ruAnfSkip@~zvAop}@tsTkuAtavApzcArqe@ryAbe_@~cQxvN|k`@~|o@mfPfjSyz\\"]]}, "type": "Feature", "properties": {"lat": 37.5653, "lng": 112.285, "CNAME": "\u5c71\u897f\u7701", "ASCRIPTION": "", "GB": "140000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["qvotFwlmkUrl[rcb@dgHlqrAhl[uXznIslZrx[l{BvaMlhQo[|mn@b}^j{l@q|S~hQuoE~z|@fdPp_Sm`Ovvo@og\\pwOqv]aeFssOdoQqyXcq_@muDs{m@{cW_wWa`a@tad@_}`@krYra@cg_@_pXyl[azI_om@mob@lHlw@smj@v`r@kbw@xsH{f~@~jt@bwJ|`^gk^"]]}, "type": "Feature", "properties": {"lat": 40.1774, "lng": 116.404, "CNAME": "\u5317\u4eac\u5e02", "ASCRIPTION": "", "GB": "110000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["sjsrFec}iU|kz@q[gkMd~m@sx[m{B{nIrlZil[tXegHmqrAh}^|cL"], ["_gbcGw}zmUhpf@}{i@v|a@joDdyWihU~cCww`@|do@idLvoTxpe@zm_@ksb@dgl@keFccDopa@jqIetaAsq@urfAzym@pi`@wWlhRntp@raW`js@wukANavr@tmo@kvTni|@eom@neRvo{@hx[rha@bxgAzo_@jcc@fte@`sDrzfAn|S|`\\}tBlss@gp\\tkb@mpSjjc@aeo@mnO{Yj_m@cre@|w\\koj@wC``Es{l@otr@frl@`^t_^}`^fk^_kt@cwJysHzf~@w`r@jbw@mw@rmj@lob@mH`zI~nm@~oXxl[sa@bg_@~|`@jrY``a@uad@zcW~vWluDr{m@pyXbq_@rsOeoQpv]`eFng\\qwOl`Owvo@gdPq_StoE_{|@p|S_iQc}^k{l@n[}mn@tgu@emMj`w@|_D|eVrv\\bua@wlFliMsrXebDc|^hnV}bJr~Dgi]m`Km`_Alvk@saXjeWirZnnc@lxZvf@pfWtui@l{[fhApqxBpgfAdghAkoQhcVjrg@fyN|dCl|o@vws@j~Vdtq@rec@xcIjgf@rgt@rwf@fcaA}lg@d~Jp_[u{Utok@`lKfze@tiBrsv@abZl}fAcw@hhd@{oOdv_AgjSxz\\_}o@lfPyvN}k`@ce_@_dQsqe@syAuavAqzcAusTjuA_{vAnp}@ofSjip@o{w@suAabq@egy@_k_@hpOct\\ozu@hwN{fMigDufk@m~wAeyg@q{Whz]gog@xZr}@~e`@}o\\bew@m|`@ofXi}P_}qAwaR|yc@odhAbd`@qbc@ffQuc[|qe@yrd@kn\\mli@zeKslD{sy@wsu@xnDaa_Aec}@yrBioz@hzd@_pSr~`A|`GteF{m|@e}XyrTcfLgvi@y|a@yzjA~|`@eqQyll@uf}@hkNywz@wiNmul@qbc@gdHac^`iFunW}zf@nf@_v}@uiXwoKa{A_~{@"]]}, "type": "Feature", "properties": {"lat": 38.8894, "lng": 115.079, "CNAME": "\u6cb3\u5317\u7701", "ASCRIPTION": "", "GB": "130000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["gwf}FmsetQh{a@vil@|diAmwdAt|a@}neAzmcAgdAcmTumv@~dBcaPssVoqs@lyS{wUyob@keMteAwlkAyxOe|Sd|Ck|iAhhd@cfb@xga@`fLtnr@NhvNtw_@|vXphMzpa@r}p@ftf@qwoB`ka@ozM|dTww`@k`@o~aAniy@mjCte^i{T|Wohj@xk_@o{XtwUwbvAs`l@ucy@_gf@trn@cw^qqxBlnMgmXrqN}yrAy|l@o_bAklWo``BhmGkgm@|pVhmG`wh@qe^bdZdwEttHhaXvzo@v~b@lym@tsuAhmo@weVjhLrn_@lik@ymEdtMols@nfiAmdcB_cCaiSlr@{pcA`ni@~@k|@qri@~m`@qcR`|Gy`h@h{d@y_`@jfRv`Y~yf@}g^h|bAuv\\rvUfc`@lx[xy@`b^cw[ulCy}c@|s[_xPjwd@cy{Az|]meRksJurYqvhArhFilHsqJr_Cy}~@ijhAkoYmlXxdVswSf|_Aq{x@naKe{VmrXyss@mxP}sZckUrxJgsTgzG_lw@~qG}_Pncc@euH`zN}~cARuBpi`@u_dA~L`E|rDcqe@j@mA~ae@meh@n}Hgri@tVtJz}k@s|JtpmA~ta@rLsEzyf@ydPxEcEtxo@lsIxFbetA|OtYl{G~w]spK|xi@`yPnxN~ii@kyd@hJk@heC|hGdA`I`fIvox@sxC|pjA|GdDecIpcGeHdEoN`LqP?__LnpSeyBvioA~qTv~Pfug@{yPnnf@dwl@rdU_qs@|ta@mwPnrDdm^`daAlfXtj}@i}_@bNjA|dKxjTw@tCcpPv_CdoL~bq@k{Jxwk@zbj@b~j@liRwmAxyXowj@jf@zAib@jcDsDxBjk^zjDnxT~iv@}rD~rY|hEzaVtzZgcMjuZ|xaAegm@fc}Csec@uwWgzv@zgWq|Rl_Ou~f@b~Ha~e@`rdEm{s@sdCunl@nws@ppm@txo@dnT`keBfpqAebbApx|@dns@trSn}iAa`[diJsva@}{a@yoQnt`@sOd]|`Fxq[it^rnEc|BjzdAeh^vgOgvGhd\\quv@rdl@}ff@siXd|Mez_Apy_@q|kBffC}w_@}vt@wfs@utTdvKwpWdjm@mtr@s{Auzb@kieAsp`Beuf@qYufz@upe@jqUyqPqcRbaDgs_@_fp@j_Gqfe@kqJmkH`fW{dv@d_Wopa@dtBux^pgm@qcWmeCu`Fuv\\ejgAdvcB_mn@pza@jlM~mXsy`@foi@ncFhdm@yi]lsq@y}Khsf@kdk@|z[_wOhtrAi{UpgOg~Mzka@`ll@iu@uyl@t{cB}si@pgg@}{I`dXgdx@znnAbh]vzm@uvSzzu@tx[d~F|oShq]q`kAzsqCmcCpsiAzfw@piCbjk@qxTxmW~pW}bIzoXddp@xu_@jeh@`seAo~Pn|~@y|\\rsr@|uQd~]ed@~sp@mvU~kZxmIdtrBe|lApb^`xFtg`Bikf@`}ZroDfzvAudk@bz\\ydBvrq@bdFtzgAbmKnhOote@`~Lsgu@oxy@{z{B}p]us]oqTadr@seCw}PsnaDy{h@qrHw{jAqahA_km@{lcAmhE}ci@qmXm{T_iSumt@`aa@{eW}te@}~{@aaX_bzAsgx@mkZiwi@`_f@gsSywGi{b@qffA_yDqgrBczFu{d@rp}E}wbC"]]}, "type": "Feature", "properties": {"lat": 35.0801, "lng": 104.614, "CNAME": "\u7518\u8083\u7701", "ASCRIPTION": "", "GB": "620000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["atlxFgif~Vbid@|vv@tjKl|m@hxn@f{uAlnw@lokAjqP_[hk^dqe@_u@nn~@xoJj_i@pwCvzfAb_aA~wdDr_d@|eq@vgZnuP~kOri|@lmZxiMdwFj~~@n~QrjXiwQhbPk|m@i~q@~kGe~OcgQslk@e`x@h`i@fuCdhe@{sj@{rCqkIeof@axg@e~FynTwtw@}zmAw_hA{jYwvHei[j}g@aoa@rxYgmIjnZrbHjch@}rMtii@paR~weAbk_Blw|AhdXrnIh}Axn[dgd@fbwAoi|@dom@umo@jvTO`vr@ajs@vukAotp@saWvWmhR{ym@qi`@a_`@_r_@_ha@`eR}e|@_nBqiVwjJmda@xfR}hTawl@ruVoaR|_V{zh@xt_Ag|h@mmh@kfoAubPe`Ayka@ovzA|hFcaQsfl@aydAxcFgqu@mr\\ifp@}hReyBbXcqxA{s\\neFnzKisgCkxIo`Xuv_@m_MupQwwgAsev@_bMatKqpFiB_DqdHyeDaAeBzoXoz_@xCiG|cGi_IpAeAn_Jwfj@yHmLtoXstYOqK|sEiiHPsA~aYi{FJBhdOs|Q_p`@}c[}Ai@adPikg@bCiF`~{@~nExHkgMfAaAruAugFk@kBzkb@guO@Kz`IgaFr@[b_UkfJn@kCbp[gaUBoAhxKebD`Aw@l_Pe|_@AQ`sFc{Bv@n@nt[b_b@p}g@e_E|ACpqP{tVt@k@jlEqsBjAyBlzt@ydZlJwf@jsPqzLtBTtmRk~QBQb~FvxCrAh@`yc@t|VnnMueM"]]}, "type": "Feature", "properties": {"lat": 41.5613, "lng": 124.043, "CNAME": "\u8fbd\u5b81\u7701", "ASCRIPTION": "", "GB": "210000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["a_ohGw|j`XjjgAzxQtei@|{P|dKp}j@|\\ztj@dzMpgf@~kZct]dsPbvOy_f@fox@q|\\}vEsoRh{kA~sv@n}Undm@~aBzhJzoo@gpGr}Xbzo@vo]`me@phy@y`Adv_D~vj@kuBjmg@wkg@hpk@xhf@kvMdj[~sD|q~@kdL|{QntAlfe@ayMnoa@smt@xun@dzOzpOlpStlu@``o@tjMlvi@rqi@fqKfo\\feh@r~_@xqAhgo@onMteMayc@u|VsAi@c~FwxCCPumRj~QuBUksPpzLmJvf@mzt@xdZkAxBklEpsBu@j@qqPztV}ABq}g@d_Eot[c_b@w@o@asFb{B@Pm_Pd|_@aAv@ixKdbDCnAcp[faUo@jCc_UjfJs@Z{`IfaFAJ{kb@fuOj@jBsuAtgFgA`AyHjgMa~{@_oEcChF`dPhkg@|Ah@~o`@|c[idOr|QKC_bYh{FQrA}sEhiHNpKuoXrtYxHlLo_Jvfj@qAdA}cGh_IyChG{oXnz_@`AdBpdHxeDhB~C`tKppFvTnoM^`TqhMnaYcDtCobUvbMnDkTvo@mvD[{AagH}pJmD^yva@xsAeJz@}mLzaEeUo@}~e@hpZytg@bxHm^fYc`[dw]wzSicA_AxB@l~@WvRrnPjih@nMta@fc[x`x@rAnJz{Fpwu@acNflDy{CeCc_@_@ocHyGasXneLuo@xLmy[juVajRs`K{JnRagl@f_Pmy|@cqLqCC_iV__CyB~EemC|`Nm@rDqAjI}u^baOuBb@wyNvcIhy@p}l@ws[utKa@Ouja@koKhmJub_@t@mApr_@maq@q`V}mb@fvX}iMy@kBdoGefXbTmAea]ms`@oAuAocKtPsuDfg@ked@cm|@cuCaAetHsyHrvC}jkAAYacLkijArck@ikH~I`@psg@_cLfXy@f`f@y}MxYdXfuNkaV~MxDrmO}mSbJqNjtBc`@hFoBlt@}bUx~@ef@pfDm_IbGsa@edDg|SyOud@Ymvf@jIsOgrJi``@reVscI{a@gyAcxCalc@l_A_mAacLuvc@rA{AsoFkva@bhb@yyImCqJ|cPgoT_EwCrvGmmVzJkYjoA}jaArByFwdJou}@teQcry@zG_Vvfe@il_@vjZtrSnBq@~gm@{yJT{DabDwkFkBwCy_Hech@b@iPhrUyea@n@XlwVge@VRd|`@o~Sb@Nvb[wi_@d@KreCqcTP}AcuGkqc@{qr@}xAi`Zosu@|dYgjYvk`@ncEtA\\f|hAg_t@fxv@sw]M_Cgl@{th@Ka@siDyyTGi@{`h@ug@mrQaxv@fm@a~\\x@gCk~Bg_XqgYkl`@hqd@srUevSo`Ws^w}[rkx@gnMhbDoiXRYxld@ihfAEc@omMefVteOwqU}|Msr^"]]}, "type": "Feature", "properties": {"lat": 43.6681, "lng": 126.194, "CNAME": "\u5409\u6797\u7701", "ASCRIPTION": "", "GB": "220000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["wswcGguhkQh{b@pffAfsSxwGhwi@a_f@rgx@lkZ`aX~azA|te@|~{@aaa@zeW~hStmt@pmXl{TlhE|ci@~jm@zlcAv{jApahAx{h@prHv}PrnaD`dr@reCts]nqTzz{B|p]rgu@nxy@nte@a~Lzj]bzfB|pLdqsApdK`aZxbQvzpBnt_@joz@}Rrqw@t~\\oj@x~Rw~Zs}Ne|o@tcqBleApqO{aq@d|[mn^`{Hcz]bhtAoci@|m@`ua@l}Obuq@|{Vnq\\lmh@gsBbgJsmx@j}f@nv@jtg@ceRvcR~bt@yxUb_d@wdDlirA_kRp{g@deb@jiUctAtmf@{hHbme@qq\\zev@hnFxrSgcTtue@d}CxxWwb[vz~@dxQ~_pCx}Gjf`@ayNped@zwWldk@fkH|{uA|{TlmbBx_w@lrXv_LnqTrhHnxx@xoNn{FeuHxon@e`P~eRncId~t@j|Tvjl@foMbh|@~_NeY`iU~}w@sbJjmTt|LzybBulN|ky@`tCh}V}`Zh~[e~XxYhuE|tk@azL|`~@b}^rqRpbVntv@dd]twRbbFb`pAa_RnvLqDp~l@afLxoSjyPzfXa~Dprw@o{Rpjr@zdKnoUxhl@hmM~ka@xjg@fc_Bjyk@pjNh_xCpcLmeDoyc@fj~@}jQ`lqAidVv{Oie[_xEuqeA|wl@ayVmfA}x]`vg@lhLfdVw|Bjtz@mcW~j|@ytLxa|@_|h@|gn@tkIhn]k`C~~h@ex_@xiZqjqBdvK{~^btr@nmF~tj@mn^n|CqcZhbv@vgLfnq@_`Ypmc@vdJvlXwgg@rsJz}Cklz@ifVq{|@uk\\dfD_|Slsj@amsAayF{bMjpR}x`@tdDijf@_mMw}Vduk@}wKncm@oOd}t@njVh~NkeLhjm@yuv@xdQ{lXecFesdA`gq@kyMktT_qCwmt@cgVicO_gm@zwSo}q@eed@|]yrx@goc@ovp@y~Lgcf@yp_@{bIvfLaj[xZejo@{th@_qbAv{x@ypNtjKc_s@cuNgvGuCk`kAi~Noba@i}]}`Vyd_AegRcySsrg@rwI{k|@{t@usfA}rZekd@mcQwzy@suYucDwbAc}i@ccNkdr@oha@eky@mmNy|t@otOkzS_sNw{uAw_[a_U}G{yq@_s`@eyCy~TkpUazz@ruVwnf@qaRcfQkn_AcdYplb@a`SiviA_}z@hsF{idAz_l@}i`C|_a@yo[awHyfe@tes@|}DvvTkrU|oYksYglg@h^mmx@s`MslNkfBiotAs}Swaz@w}Cwuo@_bW_|}@pr]{c\\ykAu_bAdmKqlg@cjG}aTwff@rqFsfUnir@o}mAqxIylFepVwlb@meJmf`Aajh@{`d@m_K{piAmgg@ib^grFpuHuq_A~|Tcue@|dPuvdAyiC_cLaz@wivCbkZgob@mdf@uaeAg[gnl@kk^_|\\moe@~JavTtsLo~zAv{LqnXycA}`j@y~]svM{be@tYid}@}yTyefAkdw@cjk@}l]vtP{s[g|_@qz@ckz@tgMejk@mhLc{KwiEq_~@lp]_~JrdY~vZt`f@ee`A|oS~mRxzMwnv@ty`@s}cA`y[sfE|rLc~x@buVqbX{kGagdBvvd@eza@ff@cnb@hxa@k}rAhx^epRze_@ulBtmy@ikn@bkLaf`@hcp@_{Zxj[crDxno@bjb@tqw@wgX|sx@n{z@j~m@`vGbmJmpRh{l@{~^caCk`d@zbNyfUqyBwad@diP_xc@g{@er|AlpKyfZhrAszo@ywGilw@r}M{umCvty@waiCrz\\_e\\bhLqhn@j{RymTbkQeyv@msGicnApqs@vvNhaC}~e@~mrB_i`Abxa@ydIjy`AirwAj_a@ixC"]]}, "type": "Feature", "properties": {"lat": 41.1153, "lng": 85.1886, "CNAME": "\u65b0\u7586\u7ef4\u543e\u5c14\u81ea\u6cbb\u533a", "ASCRIPTION": "", "GB": "650000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["imgyGm`xnVdtHryHbuC`Ajed@bm|@ruDgg@ncKuPnAtAda]ls`@cTlAeoGdfXx@jBgvX|iMp`V|mb@qr_@laq@u@lAimJtb_@tja@joK`@Nvs[ttKiy@q}l@vyNwcItBc@|u^caOpAkIl@sDdmC}`NxB_F~hV~~BpCBly|@bqL`gl@g_PzJoR`jRr`Kly[kuVto@yL`sXoeLncHxGb_@^x{CdC`cNglD{{Fqwu@sAoJgc[y`x@oMua@snPkih@VwRAm~@~@yBvzShcAb`[ew]l^gYxtg@cxH|~e@ipZdUn@|mL{aEdJ{@xva@ysAlD_@`gH|pJZzAwo@lvDoDjTnbUwbMbDuCphMoaY_@aTwTooMrev@~aMtpQvwgAtv_@l_MjxIn`XozKhsgCzs\\oeFcXbqxA|hRdyBlr\\hfp@ycFfqu@rfl@`ydA}hFbaQxka@nvzAtbPd`Almh@jfoAyt_Af|h@}_Vzzh@suVnaR|hT`wl@lda@yfRpiVvjJ|e|@~mB~ga@aeR`_`@~q_@rq@trfAkqIdtaAbcDnpa@egl@jeF{m_@jsb@woType@}do@hdL_dCvw`@eyWhhUw|a@koDipf@|{i@`{A~}{@tiXvoKof@~u}@tnW|zf@`c^aiFpbc@fdHviNlul@ikNxwz@xll@tf}@_}`@dqQx|a@xzjAbfLfvi@d}XxrTueFzm|@s~`A}`Gizd@~oSxrBhoz@`a_Adc}@vsu@ynDrlDzsy@lli@{eKxrd@jn\\tc[}qe@pbc@gfQlug@hmKdjFf|n@zh\\fyo@vgFpbg@kdPjpTpiM|teAhq^xa_@}iXjo}@~}]jub@`naAfqq@v}b@loFqxDby}Abej@dkTpmIvfh@ind@~zCreL|sl@x`k@f`m@g{Gx~m@`DbVhdV`arApfYhxe@zpXjyPxaBzx@dyVdfh@nhdA~klAzdk@loUhqRgcTdm@oeB~ca@nsTdPv_@qeApa\\tzo@d_Cwk@lyn@raJ~wh@sBv^qRheg@}JneAkz[zkUccNjx_AimOntm@szYlqN}dLxqZ|pEnfa@i`[rsxAaxuA{v[snl@cbp@{dy@bq^}qU}c@m~Bdfe@hqSpyQ{H||j@ziVnnYxkeAb`m@r|_CnwZppWqxM|w\\nbGnu\\`uk@exAvqf@`nYnnbAlsKvhrBj`Pfn[~bC`iSofiAldcBetMnls@mik@xmEkhLsn_@imo@veVmym@usuAwzo@w~b@utHiaXcdZewEawh@pe^}pVimGimGjgm@jlWn``Bx|l@n_bAsqN|yrAmnMfmXbw^pqxB~ff@urn@r`l@tcy@uwUvbvAyk_@n{X}Wnhj@ue^h{Toiy@ljCj`@n~aA}dTvw`@aka@nzMgtf@pwoB{pa@s}p@}vXqhMivNuw_@unr@Oyga@afLihd@bfb@e|Cj|iAxxOd|SueAvlkAxob@jeMmySzwUrsVnqs@_eBbaPbmTtmv@{mcAfdAu|a@|neA}diAlwdAi{a@wil@sp}E|wbCltZ{bgEl{Omi~Fg_OiyyArlA}jy@w`Ie{Hp|A}rfBfr[kkkC~gC}ml@lnu@e~t@luN}fgAii@qdr@~ts@cshCb~NwguAqVewi@izLidwAjwh@zm@xh@y~lAdcMkoPql_@whv@oed@yirAmucAukoE{bM{`}A_tQgce@taHe`Txt@ureAkyJwq|@j}KyesBuxJ{wa@pjC}_s@i}Eg`p@{s^e}eAcqFywl@gcT_qy@wkoB}|yB{i]s_hB{a^grc@kbCwa^ujo@|oNowa@xds@seu@xoa@oib@ygZgsf@s}Iucf@uy[mzT{zk@l}A{hrAhi[_e`@pxPinp@jrQ}vwCiq_@act@qdBqh]y|d@}ew@cpr@yte@whIche@z}Jshm@}qAupiAapLge`Askj@e{`AqoPslp@}gd@ndBaz^{wYsle@udq@ijKoia@jsCitgBu|i@wzGonCsy`@lpLyvn@gnf@ygzAvlG_hu@qnIgdsA~nRkiQv_Gu|t@}zJ_peBm`m@qjBcoVdeYon`@neNy{f@zw`AcrNrbAkpKfqi@w{Vd~BmkT`ffAqsi@|}e@{oHzk_AlhDf}qAb`hAf|rA{ub@tpw@wtLlgi@rsIdbrAgsFj`c@~me@tg~@ssm@fqeAwql@f`IcgSyyw@ads@r~Cg`x@aev@syHlaF_h~DmwcCre^qbbAfnJkwoAppT{l_AeyQidt@iz|@{l_B_tI{adBqsV}jd@qcg@iyP{hFrab@a_`Acgd@iaO_tVysZidBkvZcef@{ol@ydPwbVmb^{~u@}`XfEutMm}f@orz@{eHwub@q~l@mhV{n]j{\\}wj@wvJycSrei@xxKx`lAmof@qgCi~Naoe@itmAeogBup@umlAytIkbt@juQugb@lan@c}D~ua@xeWrhYlig@bmc@sxFtnI{yk@hgX_iL`pCs{j@upc@u~d@tmLcxg@puZy_m@~`x@arYjam@e|Dldd@caZdgj@ouPhyNc{y@yiG}ax@icTcn[x`Raih@_{H{qu@xzLexe@kyRyjQzhJ{dXeuIs}m@ahj@}tc@enFgz`@hwc@{sbAxdk@}_e@nbb@}ls@lbnAvbo@roM_yE`fU|vm@jqn@~a[hpLn`[fkb@l_Mtiw@beAfhdAkkG|dd@|o[sjJzfh@p`tAvbx@jzd@fkQbxn@}fHfiVpg\\ssbA|s]niRrua@jepAnfiBblNvoo@lk^`qWx|l@vdnBdne@`ha@hr`@q{XlqRovm@plZinAfih@wzg@inCek]i~To`LldH_wkAzeWbmC|mArqm@`tR|`eA~pZuTxtc@aw_@"]]}, "type": "Feature", "properties": {"lat": 41.5719, "lng": 111.603, "CNAME": "\u5185\u8499\u53e4\u81ea\u6cbb\u533a", "ASCRIPTION": "", "GB": "150000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["q_neIwa}rV~xZ_mr@{dE{zTf{]w`f@ryN}lnAs}IuqYfFogl@~oUgwoAlpYixTtic@kzo@s`G_dIpcGenMluZzvYbmJwbf@|~Ygg^jdRx{AdpDknVpnO`yYxeM}|p@||f@taKphf@gaj@l_^`a@ppG{cYlml@a~X|yl@zqI~bXeef@bjdAqmo@|_n@~vFrxQgnu@xi`@llSxdo@ukCteGa_Vdnd@af`@f~HwseAojLu~fAn{Fcu`@adEkgFpnE{cIbaN|pKpxDqdt@jhR}wJgCwnKywGuoM|^k}GnlFkxHkoO_lV|}GgtTnhSkwBj@ch\\~|XosUbkLqcSv_Ka`AlmBc|NjrVmfe@g{Awgj@`mJ}jQkpCi}\\zgNpuKzbd@jcNx~QchQzgDqoXbpb@wwLvl`@bf`@|`d@aaf@bmo@ok^}mGybg@lPi||@`iJkyx@ccFec\\clD}duB_td@gaJ`@_r[wib@csm@g^eocBcuZmhc@{aXw{uAe}F_o}@vmAmlb@dhGaaMugAyjLiyKa{M}vAim]lfC_pDvhFzUpfVv`fAt`y@|aa@~bo@wal@dzq@nph@fdHrvp@txa@nx]ziL{iM|sNlb@|rAz_On_PtvFf{AzqCrbb@zhIvsa@huBvi]ba^zvDaaA~FsbG`lH_eHntCdpAfmAvvG~hP{eEbcnAvl_AufC`kNjz{@jnVfbLp__@|mk@~`Ypa]ebG|pSxdc@ksk@|uvD}eP|eWhhk@vrf@|q[`bp@`cCnrt@b|Wfoc@brTkcZpx`Cu~e@vah@zhQ`b`Ak`P||Mrr^ueOvqUnmMdfVDb@yld@hhfASXibDniXskx@fnMr^v}[dvSn`Wiqd@rrUpgYjl`@j~Bf_Xy@fCgm@`~\\lrQ`xv@z`h@tg@Fh@riDxyTJ`@fl@zth@L~Bgxv@rw]g|hAf_t@uA]wk`@ocE}dYfjYh`Znsu@zqr@|xAbuGjqc@Q|AseCpcTe@Jwb[vi_@c@Oe|`@n~SWSmwVfe@o@YirUxea@c@hPx_Hdch@jBvC`bDvkFUzD_hm@zyJoBp@wjZurSwfe@hl_@{G~UueQbry@vdJnu}@sBxFkoA|jaA{JjYsvGlmV~DvC}cPfoTlCpJchb@xyIroFjva@sAzA`cLtvc@m_A~lAbxC`lc@za@fyAseVrcIfrJh``@kIrOXlvf@xOtd@ddDf|ScGra@qfDl_Iy~@df@mt@|bUiFnBktBb`@cJpNsmO|mS_NyDguNjaVyYeXg`f@x}MgXx@qsg@~bL_Ja@sck@hkH`cLjijA@XsvC|jkAytc@`w_@_qZtTatR}`eA}mAsqm@{eWcmCmdH~vkAh~Tn`LhnCdk]gih@vzg@qlZhnAmqRnvm@ir`@p{Xene@aha@y|l@wdnBmk^aqWclNwoo@kepAofiBoiRsua@rsbA}s]giVqg\\cxn@|fHkzd@gkQq`tAwbx@rjJ{fh@}dd@}o[ghdAjkGuiw@ceAgkb@m_MipLo`[kqn@_b[afU}vm@soM~xEmbnAwbo@obb@|ls@ydk@|_e@iwc@zsbAdnFfz`@`hj@|tc@duIr}m@{hJzdXjyRxjQyzLdxe@~zHzqu@y`R`ih@hcTbn[xiG|ax@iyNb{y@egj@nuPmdd@baZkam@d|D_ax@`rYquZx_m@umLbxg@tpc@t~d@apCr{j@igX~hLunIzyk@cmc@rxFshYmig@_va@yeWman@b}DkuQtgb@gcQuzhAbc@a{i@}tM{nr@|`I_zKeeBoqzAckRmngAbj@_ut@fqK{c}@"]]}, "type": "Feature", "properties": {"lat": 46.9622, "lng": 128.074, "CNAME": "\u9ed1\u9f99\u6c5f\u7701", "ASCRIPTION": "", "GB": "230000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["girhCkoqyTz{Mf@nfS{gHvhi@??~si@z|@~rD{|@~vB?~am@?nxJvhAnjBgc@f`DwaGfpKonEr~AoqBqp@qVeIeqDclAw`@os@gwJsfC{sQ?ooG{jNsjFsfHrAsId@yCh@eDfAaHbBeDlBqDpDeHnEsInEuI`BaDfKaSxAsCtAkC~CiG{@_C_CqGcBwEkBeFiB_FuB{FkAaD{BgGmBiFwA{DmAeDgB_Fl@sC`@sBpDiQt@sDfAmFt@sDn@}Cl@wCp@kHQiM]_A_AgBAY?eBIuDJwDv@wEtAsF|A{G^qDpAaEx@aDC_FJc@TuFWaFkAsFmCoIeBwCmAyBsBkB{BuA_DW{GUgGOcHcAaG_CeD}AwBgB}BwCwE}G{DaHqBmDu@gCa@iCQ{AMmBQyB[oCGwBa@yDa@aDm@oC[gBWsBNqBjAwC~BmDdF}F|BeCp@eE[{EiC_ImHsIuIkHcIaF_FoAmBw@sEFiC`AeDbH{A|EaCnEkDzEaDvBaEpBkDBcCyAsAuBwAuEWyGa@gFiA}Go@eCeAeBmAmAmBkAuBeAsBeAwCqBgBmBeBcCq@gBs@cCg@sBe@}CLuBl@eBfAaC|@mAfAuAdEiDxBoBdA_B\\{BBaCMkCo@eDy@{Fa@yCu@oEe@uBMcAZ}@v@gId@sEV}BQcCcAeBkBaAkE_As@oAHcB|@gAfCk@xBBtEJrEVnDHrB@bB]jA{@nAwBt@wEVoBD{Bs@wDs@_B}@aCyAkBKOg@Ks@EgA@iA@qCEcBAkBCwAY{@m@g@u@_@y@MeAMiAAmAb@{BBaCLeCPmCC]uDwGQ]k@J{@V{Ax@kBp@w@Bq@Mu@q@s@cAu@cASw@a@gAa@qA[}ACeAa@qBKmK?w@A_ASw@Gw@m@a@a@w@g@u@i@i@m@a@{BkAuASo@KS?CUAa@Bw@CUPa@^y@?i@AUFc@JmHr@{FLaAKUGw@aAkAo@i@_@w@Sa@[SYc@g@u@a@i@MMg@_A_@a@Ow@QK@{CJmALc@Ai@Bo@XaA`BmLf@Wp@w@fBoA?GhCiJNc@Rc@Aw@g@aICc@a@i@mA_GQaAa@a@S?SU_@@aJDiBoAs@q@i@a@k@a@}Ld@gBFs@@s@?g@@WGm@KwAY_@?{@Eu@SSM_@EMc@qWkJW?[YS[?UAw@^eAJgAJq@Rq@Ji@FcA@Ob@kGG]MYSUYEg@YS?_@Us@@iBg@g@i@s@YU]SKKM_@?u@Sy@Eu@SgAw@}@o@mBwAu@Sg@[_@YSUu@a@_@[{@o@{@u@}BcCm@w@i@u@_@w@A]b@sAr@mAl@k@f@O^SjAe@Z?xAy@r@UdA}AG_A?w@Ai@Dq@SeAUkA_@q@g@s@ACs@kAi@o@_@i@g@Sm@o@[a@a@[?cBAo@D[Dw@Lk@V[?C?WXk@V[ZS\\e@Rc@d@q@Xo@Py@Ry@Hg@Jk@?UFYAk@T{E?g@E[Ak@Gi@?w@Ec@Aa@Mc@Ei@Sg@Iq@Sw@Do@Vy@Xw@^c@Rs@Xa@j@gAj@k@r@G^?n@Dl@Al@Gl@EdAIl@?r@AZMx@Al@?r@MVGRUvAyFd@_A^q@vBcF?E?i@a@i@{@Kk@So@OQ@[g@Gs@?E?w@Dq@Ao@FMAk@Jq@?w@Jo@Jy@D_ADg@Jy@Vq@Aq@Zw@Dw@LmA~AoOReBOwBEo@Uy@qE_PDMDq@Aw@Gq@Mw@Mw@Mq@Mo@[w@Qa@gCkHDG?UA[DGEo@CSC]?UFsEnAaMZcDGw@Mw@?q@WeFGs@Ew@Ao@Gw@?w@Mq@GgAEaB^sB\\yATaA`@mABwA?_B@}@GgB?KMk@?KKc@[q@KWAW?U?KJUdAoA^w@d@q@f@s@^w@HMf@uAJc@Dw@Jw@JUD[?q@Aw@Ko@G[{@}DOu@m@c@i@g@a@k@OSG[Ea@@WFQDOXc@d@y@j@w@r@[f@e@vCoCjRuW`B{B`EwCl@y@j@k@r@k@h@a@nKa@jCxAlJoBjAe@?_GCyc@wj@{Ta[uhAm_AmhDeIumEiFqtCjf@gvRfiB{bC"]]}, "type": "Feature", "properties": {"lat": 22.3357, "lng": 114.187, "CNAME": "\u9999\u6e2f\u7279\u522b\u884c\u653f\u533a", "ASCRIPTION": "", "GB": "810000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["}hbfCoejtTlsJ`mHahXxqGkvGasO~jUyk@"]]}, "type": "Feature", "properties": {"lat": 22.1364, "lng": 113.555, "CNAME": "\u6fb3\u95e8\u7279\u522b\u884c\u653f\u533a", "ASCRIPTION": "", "GB": "820000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["qolVm~|jTd^vsAcGj}@aW`s@yr@~MmoAlEyXsGo^gSad@kv@uUky@sAws@fV_n@lrAwb@plAdJtcAhm@"], ["kcrVqzglTnXbeAwGtvA_e@thAux@lh@adA~S}wA}O}tA}x@{f@cbAmDoy@xJo_A|^sbAl~@oe@viAgK`uAzRdcBpdA"], ["mw`We`ilTjFluAaa@xiAi~@zVcuA_MqtB}o@ol@ovAkGym@lP_n@voAit@bxAiK|kBbj@hr@rpA"], ["kvy]w}~nTnLzeDeHhnBqVfwBedAlk@o}BpN}nBuR}`Aua@ex@mm@mDibAnSkhAd{C_sE~u@qhA~fAw_@joAbJjfAfyA"], ["{}t_@imqnT`l@jnD}SbfDmVz|Ao~@~y@{o@Jid@sDor@mm@{OeeAcc@yqF_JuyAbEekAjaAcw@baAgHniAlg@jr@b|@"], ["s_ab@cx_nTnA`nA__@dqAsrBrcCsoAph@}zAgAilGgxCga@uj@eMc_@`s@seAxzBuq@vfIkj@|wAvXzi@xa@"], ["sw`m@_ym}SnpA~MvHdwAqUbiLp[xnKbhB`oJf_Fd}OdrAflC|eAllA|~E|`AtwFvgEnaGtuGzcBzhEzHlbAkr@hmA_`B`d@kkAaNsoE_aAmxIuvEqlM{jLa{JkkLq}BidDieAinEzEoeJtx@g|HxgFknTh`BkbB"], ["ovom@ukzuTpv@fzJ}JvnAuq@nTmoAeJmZoQ_a@{eB_c@y{Cm@_cDjOkw@xq@qi@`mAnLbh@hy@"], ["khro@uyxyTva@yr@xx@u~@poBwiA?zX}vAb}@uiAjjAea@vsA?tpAdE|`Ab^vsAf}@hbDteB|qDdnJriRzs@dgAbz@tz@zs@`n@xp@bXjtCtd@brBtz@l_Bfq@zoAnmAteB~eC`sAtuClcAnjFpj@zbCtiArrCh|AncB|_EviBrzC`zAbz@viBreB~_MeExg@{WbBqN}Tc^_k@_[oa@yp@lHc^j^eE|`A~ZjjAlg@td@fa@tNzWcX~Zow@j`AqKvp@_Uf}@adAlcAs|BtQc_DiHkqE}s@ibD_w@emLbBqrCuQi`Bid@}vAaw@ysAe}@w}@k`AkjAwp@adAyp@}bCkxBmiMiH{vAga@ckEe}@y}@_sAqKszCpKcrBgEuaCkt@kpDkjAqbB}j@yhBysAum@}`AsiA_fCo_BkqEi|AuaE}Wqa@{s@k^cz@?qfApKq~Bv}@_c@lX?{XtSwLptB}}@dtA{U~cAx@lq@|Tjq@xo@juAj}D`cB||EzgAp`Ctl@|}@vcBrkAj_Btp@vhD|iAthCjp@lfB|BbpDsIdnAtMxt@xo@te@`sApPb}CfK|pAluB``Mdk@pxBhj@nhAv|@pbA|eAxdAtl@`x@pd@phAnTbeAxH`fBtA~tC~r@duKbc@b|BxXzyBbCz}AeD`sBg[p|Bkm@`vA{q@xx@qnAln@{eAhZwa@nw@{c@hMeo@aOia@gd@iZkr@eJ{bAdMwgA|c@k[fv@yOhXEdh@dd@hZ`w@acBuoLq|@ulByjCkrA_kEauBkaBacBcjAmtCqn@smC}{@qfFwnAkfCqcBy|BqrAwkAkxAi{@c}Bk}@ofCo\\}|@}Uoj@qf@}eAcgA_x@swAgkJa`R}hBs_Ey`AwcDgZmgA{Ho{ArAyaAfNuy@"], ["ynrn@{`v}ShM|yD}]bmAofAt^yeErEgdF}L}v@kSmcFesDkkDknDo`AkzC_nA{kNDym@rkAu^xvGnzA`~IbyBpkDxdCz`DrgFhjAdhF"], ["urwo@m{mhTvj@ulCho@y`BdeCwp@poMyjCtyDob@njGpw@`{EeOfhEisAhpAQvwCns@vjDnuAdlBdzCvcCbcFnyAngAzjDfx@j|CruArlFrfH`tAn|DpZ~~EwMzvAco@xy@guAva@{dC}BgaD}fAgxJklB{zEaLolAxB?aWhtAuBfeFtNfqJ`pBrzCfgA~jCbBlcAyg@fa@yg@hHkjAwTuwEcvAynDebFefHgqCijAw|Dy}@o_BysAuaCkgFcrBgbDqzCggAowCan@i|AtN}cDjjAkhFxQogG}`AgmDj^{tMrrC_oBj^{s@tpAum@xxCpNvkDvlAbiC|s@nw@vePxwJbjDdsBb{Mjt@hoNmT?bWatNtW_pNs_AaaDciB_cPc|JsaAsgA_fA_gCeQ}|D"], ["k_ro@k{vaTll@rlAyXn}@asCfy@ocC\\wtEy{@qeEw\\gcC}q@a]oaBtSubAngDwcA`gDvWznIh_BlmC`w@"], ["}pop@ixpjT`rAljD{XljDwgAvnEkwAz`Cs{Bn|Ay`CpNw{BwScrAynEc^irGnh@u|GnpCmpC`fCqh@hqBxS~_DdeD"], ["whrp@{u}{TdmB~WtzAhiA~w@|rA|`AnmCp`@|wDuMnlDwfEnnY_b@xvB}a@zgAnn@~}CvIzmC_FnVy\\cAoqAu}@we@ubAawAaoIchAe|@czCsxFowC{bHes@{hCeLmvBjTyrC`nAkvDrpB}qDztBmeCrkCshAlvA_B"], ["gzip@w}`aTpRz_DsIdrA}b@~m@efEvxAmzEpt@atBi]u`AskBspC}gLodAioJdYmkC`{Ass@`oBxMfcCpg@r}IzaEhb@hbA~}AhtJ"], ["w~mz@{g_gU~eAdd@z`@|vAjBxlAy`@zgBm]dkByE|vAiBhfC?xzE}OjuBaZzgBkn@psAwq@jiAiiAf_AkzA~j@u}AtV{vAkB{lAkn@in@epAgd@qzCkBqsAdd@aaBdpAubAdpAkiAvq@miAtq@cpAvq@qsApg@ylAfd@wlAfS}vArg@e|Bpg@sbAln@ox@zj@aZ"], ["kng~@cfe{T`rGbn@zHtBzH|H~Xpk@xW`T`TzRjPpQrLhPn[zl@d@pQmFtLbO~XbOzg@tGle@fEbd@zCf_@vB|b@?vWwBbO}H|Cua@|CmrC{aA{HeJoyAobD~Nmw@oLaByjBme@aO{HcOcJu{@osBrQsk@"], ["}qf~@uahfU~w@c{A?sbCss@{aGqf@}cBy`AulB{j@o_BdLsiApPiY~w@}TheAjCps@ts@rbC``EdeAldEl|@ldE~TluBkCpgFsPb{A{j@x`Aeo@zj@{`A|TihBpP{rDeLghB{j@aqBwvAulBc{Acx@krAiYeeAhYss@bx@yGniAxGrbCfhB~mAzj@vvA|TfeAss@"], ["ay`_AmwqgU|_@ppPwRhd@id@z_@ss@qEsiAab@_x@w]epAwkAuaBcqBs~@c{AeLqiAvGy`Aho@oq@bcFivCzu@}_@zj@eAfd@|Ibb@nf@vGnq@"], ["ijrdA{przT?~XoAxWkKl[sQzRke@hPcn@jKe_@vBsf@nAua@gEkj@aO_^{MwpAqVci@}C}b@wBmiGrLaTm[cJg_@cJe_@gE_^?_Y~CaYdEoVzHmKlKkFbJ?jeQ`n@n[tBrf@lKfZjKjPbOnVnVlKxW"], ["}wtgAca`iUbiCsmLnqGuaOfuIwjMvtIswJxsIsuD~iHvJxrFjqDhnDxcE?|mAgpEazFgsEuuCwpGqK_wB`n@gbGvuCwtRhvWusHdtPmuAzpK?peIxfCdcMf}E~xH~vP`jLhcQpeIx}JpeIriFllHvaBllHkp@peIy}JjuNusHfkJwaB~xHjp@|pKpdEf|M~zGbrI|lNz_HdtMr|BjhRx}@bjK?dxDs|BvxIgvWxaByqTlrTiae@|uF}vAnzBpKdsCp|BluA|pK~c@peIf}ErmFbeJhsGp`NxfGtoQ|gEzkD?n_D}vAyfCq|BybLaaForTi|MsnGajLozBywJ}|L}dJulGo_Fe|CsbFidA{nDaBehBfw@qhDrsH{wBlpH}aBliOpa@pmAggAvZciCybAgoSckAw`D{nBqgCu|MwgHokH_kM_bC{mCy{BomA{tDlHwzLl`G{fHtpAwvEud@sjJm{D{oC}j@aiK|j@}wEcXecD_pEo_E{rJ_dPuqS?}mAd~IjiKr_GviI~hEtsJ`fCbrD`bDtK`wKok@noDdu@zqIp~DjxEbYfoGgfAd|MwiGfbD_NpaDtlBdfClvCjsCniFzeCzmE|rFtuCzrFpcDrxBpvCbbAxdDt_AxiSsh@reDs~AxrAafFeKi|GuXaaJlpBsfFtaBcv@xwCO~_BvoAtdDxeCv{ErrFbmEheFrcD``GpvFxwB~nHrgHzaNxrFlqDntNflH|wEflBjoD~bAdpArqASt{BcuC|nBcfFt@knG}kBcqL_pDqyM_uFi{GqhFo|D{cDmt@yrDh@ifG}nAc}HsxBqvCotCwKcgCpi@czQjm]kvCjhJ{i@~~Kqv@~jF_rJtiWcyEloB{yPqVi~Oc|AazM_tC}lJazEyiEg{EmsCu{EumDsoKu`AygMx_Bk~HxkHs{I|tIksK|lBikF`@{nEgjBcoHeaD_rDqmGidGw_UkuL_cL}~GswEsqDadFeoKmwBitJjNkgJ"], ["idh{AgtanUpInZ}CnUmAbGyFjC}J{JoHwQ~EcV`RwG"], ["kek{A_{dnUpInZ}CnUmAbGyFjC}J{JoHwQ~EcV`RwG"], ["k{}{As{smUjhA{fAjl@sg@`_@gTva@sNn`@gTnl@cj@zl@o}@|Rox@xUsv@jKkf@zLgh@xO{m@tV_]|dAon@bgAsNju@nFtInDl@zNhEzAu~Bjm@u`@v[qHbj@oNfr@cb@zzA_b@bwAmR~a@ge@rg@mc@rXgi@zYqy@bt@{a@vQal@zYqe@~u@rCjp@xSn_@mCfEhr@jM~f@bG`d@~Hnk@f@d~@g@jx@f@h{@kCh~@oFpx@sDdv@oJp[ia@lJ}f@?s|BbPeiAp[{nAwDcx@mJga@f_AkcFlJtXtNjfAtDznAvDnkBwDbaE?dqBuDncA__@`r@eo@zc@}_AnPej@~Cgg@vBou@cBi{@f@iq@vBcg@g@kn@Ri{BsXscAsIgx@{Eee@cVcYgr@sC{r@gBsl@`[_b@", "mjl{Am`mmUrNmF{DeXoq@uKwUrIqDzP`dAxO"], ["}jt|A__|jU|VdjC}sBd_BkhBz[{yBk^w_Aop@{iAkpB~t@e~BbxAmr@z}BgAnuAfi@jgBrcA"], ["smg}AicwvTjb@sc@mOsnA?aIlg@gkCjJeSbNeNbIiEtP?~VhEvUdNlTdSvPjb@rKlg@?lTqAnTevA|qEgEzG}LnAgX_Dm_AmOeNkJ_DiE?}Lf@aIhEkJ"], ["esd~AmlfuT?|d@{Gll@mTpq@{_@z|@{LdSeNtKmOnAcN?sKqF}L_W}aAsvCiE_WiEa\\nAi]`Da\\rK_WjJsKbIyBjJ?`tCveA|Q|LzGdS"], ["kxq_Bmks{Tf@fSqAjOqFvP}QhJqYrFay@zLixBnT{d@nAgXf@gS?gXiEoTqFgXkJsKcIsKeSqFa\\?}QjOsv@dNuh@jJeSrKuPjJcIbNoAlOf@zLpAxbEhu@pYpF~VjJzd@nYtPtPrFtP"], ["y{x_ByhsvT?fSoAxGiE`DyZ?yZoAwZkJihD}dCsKeSiEeSoAuPvBkJzGiEtPi@|QhEh]jJjrAz_@`t@~VdSbNdNtPzLpY|Lx_@vB~V"], ["}ux`BemnxTfE||L{GnYyL`DwPh@_WaDaNkJeIoTgXuhFaDqq@?_o@`Dgp@bNimApFeNjJuPjJkJdNoAzLf@lOjJlOvUh@h]"], ["m~s`Buom|Th@jJi@zLyGxGsKbIgSf@kzFxrCieBheBwU?mOkJqKuP{Gq^yBy_@f@a\\lOihAh]ecArK_WfSa\\vZ_Wdf@a\\p^sK||@g@fp@hE~n@bI~VhEtc@bNnYlOvUtPhJlO"], ["yf{`BoqnyTnAdNoAzLcDbIuuB|iCuKbI{L~C{L`DgS`DcN?oTyGkJmOyGeSkJ}d@yBy_@oAa\\{GotE?{LpAcIhEcIzLiEjJoAxG?hxEtxDrFrK"], ["{d{aBwa{{T`tCpnArv@n|A{tAbiBqYdnEqAvUg@~[?vm@tKj}Hqq@a|BkuCeaO{Lyw@aDef@hEuh@jJmg@~Vek@nTgXzLsFlOiEfXoA"], ["ubvaBykchThDeT?g[qBkb@qIsg@cMy^oRg[q`@}l@oY_]eTgTkKoYw@{N`FcMtPnB|UlR|l@pw@fT~\\tWjb@jb@diAv^zzAx@hb@?fiAiDp`@eTdTgTbMuWzGa]fD}l@?wWoBg[yGcd@}Nki@ib@oYa]a]ib@uvDosG|gG`~GdbApY|Uy@lRaFl`Aki@pIgT"], ["omgbByskiTli@sg@lp@gTdk@oB`{@xGni@~Ulw@r~@`]`d@|cAr|AjKjb@xGj`AnBdiAiDnnAwGbd@at@dsDqXhDkK}F{GuPtn@{mDsAmyDuPa{@i[gr@gb@q`@ed@mRq`@iDad@gDib@v@qY`Fq`@bM}UnYmRtn@aFnp@fDrqLpBtzBxGze@~{@paDwHdEoMMwLyK_Vkb@oYun@mRueAwGmp@aFueAc]agLoBow@nBebArIow@vWa{@|Ucd@"], ["_ynbBmo`nTbNf@pKhEzLjOrPbf@lJbk@xGjl@?rm@qAn^aIpc@uPnYkOtUeXlv@_Djg@?zi@lA`k@jJzd@zLxd@vUbk@t_@rm@`a@`f@tUrPbSp^dSv_@xGrh@xBxi@?tm@aDdwA_Ifu@eIzi@kTlY{Q`DsPaDek@qc@sh@mv@eXsh@qc@{fAqKcp@sKgz@{Gmq@oKmpBsA_y@g@w|@f@ov@|s@exL`DcNtKkOxLyB"], ["su`zBs`qbTph@ePsCwClcZykP~IyJrmAicK{oAy_Pz|A_cApuBgd@bGeg@fgDeN|sXy`GvsQg`@z`O@zfVdaZum@jbAjp\\l{a@r[~LbipB`sf@vbDxFr}JfvD|wDt_AxAdXdsBrv@au@tqNdq@x_MdEhOpyk@b{n@fdE|{[b`CxqG`cRxqS`tGzaEz}BtkMjGlFaCzH~e@h_EczBxMshJzxZ_[xwKu[`xh@mmHp`TwxAllJafXx~q@up@|mBiDHgaA`eCcnGnnAm`M_bDi{O`[ymBrEwuId}@inu@frJi}FprAunSgyAirMinA}aLasCqhDghCeaAa_C}ve@aaz@uqL}c`@uEwIuxJ`s@~GdSsnMnp@ufUs{RkjBe~Fzr@mzCzcBweHjt@clKqpQglZmHqJYuByDoGb@_J}lB{kM?qpLlmE{xLsuD{c|@}a@qtAkxJqkEobDakf@qSis@xiNyo`@qiDypDqdIaXcmLm}T"]]}, "type": "Feature", "properties": {"lat": 19.2044, "lng": 109.741, "CNAME": "\u6d77\u5357\u7701", "ASCRIPTION": "", "GB": "460000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["mip}B}qqhUnlB{aA|eCeo@n~FmMfdApHdyCfgAxnDfuB~nAtzBjs@jpAjKj~@|y@|bIzGloAo^jnAyaBh|Act@~\\}i@yPis@mkD}o@eyDdGifAxEw]c_@{eDi`Aoj@gr@oZufA}UwkCgf@og@a@gjCb@wnC~r@a[|y@~[lxAfgCnmDJplAoc@hp@yyEdyE{XiDcj@aJen@y_Aik@q|@kV_rA}F}mBuA_uD|A{vAxaE}wG"], ["uhe_C}bhcUtOlmByaAdrDioG`yIouE`mDqrAoNsy@qbAsa@o{AwK}kCtpAslJvi@gyCncAou@pcCy_AljBcEprDvE~pBhpC"], ["a}wbCagpoTfmCxsF_xGjpGq_MzeDchGy`Ek`Iw`TdrBqpEb{ChlIbfI~_C|lLzo@lpCcvB"], ["wqwzC}udrT`fc@k_fA}Guwf@{dUejXzz_@ycWq~Agxk@w`Xumn@d}Xijd@nnJqfBvrSx`B`y[|k{@ddn@hsVniLxgDba_@ss_@omx@un|Dry`@w{]zdIizh@uvx@`OqoM{oTji[uceAmnDmwWdni@cw\\inMsmo@n_YjyBlsa@gm[~q`A}bF`ecAmeVlxLwbYzbA||m@fgeAxk`@heJtvb@n`_@peF~jK`wp@~{Vfi_@llGxeq@mrJlju@hf]xaYurXjwp@lhHja`@j~ZpcVfzGrna@mce@|gDvkq@vcm@{lNbeRz}Dftd@~wDjqTp}BrmJ|}B`m^iqm@p~Zvfp@nsYx{o@eb@jvG`sO`hXyqGxqLrt]ccLzwiAjzEn|N`fUvna@ln]b{ZbpKvxdAgsRxpL~oInug@f}m@dypAjaH|r}AbhK`nw@pxa@vi][v`Xxl_@btx@dif@p|@d_Mgoe@xnWhhB~db@ic^rt[`dQp{Pbt|@gt_@|tTop[jga@kpz@|s]ols@f]azSqkRk_m@_cCk|VxzHsfNgb_@{ta@yaEcvE{_w@m{L}}]}yh@d~@vbCs_Wky\\cfj@}ar@gwCwxPetz@a_n@gdz@iwwA_d@yfv@s{Vwjb@auy@kfb@g{\\_vl@fkDuf_@qf[wkn@hkXwqTyyQwfUsyZ_pYbzGswb@qyLm{Bcp`@z|TwtcArjb@gyKipQmij@g|p@xrAuI|vV}iPjwAk`Hm~SetXu_w@"]]}, "type": "Feature", "properties": {"lat": 23.724, "lng": 113.433, "CNAME": "\u5e7f\u4e1c\u7701", "ASCRIPTION": "", "GB": "440000"}}, {"geometry": {"points": [], "type": "MultiPolygon", "coordinates": [["qeigCch{`Vn|tAt}BkdCdvK{`A|wNgv_@bpAwct@naWyq^tpp@gvwAt`b@}sQxiWow{@{yWyxoA{dDyqv@__o@cec@yoLi|`Aspl@q{JwaSopgA}|j@apUwocAuoZapYrmY{~_@dxGsdf@ttRehFta`@rpU~cs@ozFn{u@jiS`qi@fx\\t{MwtDrsoD`wr@dwbAx_i@tcP|aZdz_A|rZ"], ["{ie|Cm_eqVjzElz@wBjo@qQv\\w\\~XaYhUgp@rvGVjyAnSlp@rKbq@aTxSab@iIiJ_RsVek@aLko@lNky@okE{rIhfDc{C"], ["grd}CsgjwVfdD~Eh@vkAcoAzlCzZfeB`Nps@jFjvA}tA`Ia|GunF~r@yvAfuDkuC"]]}, "type": "Feature", "properties": {"lat": 23.7608, "lng": 120.976, "CNAME": "\u53f0\u6e7e\u7701", "ASCRIPTION": "", "GB": "710000"}}]};
        for(var f in regions.features){
            regions.features[f] = L.GeoJSON.Encoded.prototype._decodeFeature(regions.features[f]);
        }
        // 绘制行政区域
        drawRegions(regions, gbcode);
	}
	
	/**
	 * 绘制行政区划
	 * @param regions 行政区划边界数据
	 */
	function drawRegions(regions, gbcode){
        var activeGB = 0;
		clearDistrict();
		geoJson = L.geoJson(regions, {
			style:function(feature){
				var rdm = Math.floor(Math.random()*6);
				return {
					weight:2, 
		        	fillOpacity:fillOpacity, 
		        	color:'#fff',
		        	dashArray:'0',
		        	fillColor:colors[rdm]
				};
			},
			onEachFeature:function(feature, layer){
                var feature = feature;
				// 当前feature的行政区划code
				var gb = feature.properties['GB'];
				var lat = feature.properties['lat'];
				var lng = feature.properties['lng'];
				var cname = feature.properties['CNAME'];
				gb = (gb.length != 9)?('156' + gb):gb;
                layerInfos[gb] = layer;
				// 求当前行政区划上所有统计图层所具有的属性，并绑定到feature上
				layer.on('mousemove', function(evt){
					var left = evt.originalEvent.pageX+25+'px';
		    		var top = evt.originalEvent.pageY+'px';
					$('#app').children('.property_popup').css({left:left, top:top});
				});
				// 鼠标离开行政区
				layer.on('mouseout', function(){
                    layerInfos[gb].hasBold = false;
					this.setStyle({dashArray:'0', weight:2,	color:'#fff'});
					this.bringToBack();
					$('#app').children('.property_popup').remove();
                    activeGB = 0;
				});
				// 鼠标离开行政区
				layer.on('mouseover', function(){
                    if(activeGB != gb) { //解决ie双击bug
                        activeGB = gb;
                        for(var key in layerInfos) {
                            if(layerInfos[key].hasBold) {
                                layerInfos[key].setStyle({dashArray:'0', weight:2, color:'#ffffff'});
                                layerInfos[key].hasBold = false;
                            }
                        }
                        layerInfos[gb].hasBold = true;
                        this.setStyle({dashArray:'0', weight:5, color:'#0002fb'});
                        this.bringToFront();
                        // 获取所有统计图层的属性
                        propertiesBox(cname, gb, currentNode);
                    }
				});
				// 鼠标双击行政区
				layer.on('dblclick', function(){
					// 双击区县级别的行政区，不做处理，直接返回
					if(gb.substr(-2) != '00' || currentNode.subjectType == '1'){
						return;
					}
					// 中心点经纬度
					var latlng = L.latLng(lat, lng);
					var zoom = getZoomByGbcode(gb);
					map.setView(latlng, zoom); // 设置地图中心点为选中的行政区
					setGbcodeByZoom(gb);
					getBorderInfos(gb, currentNode);
				});
                map.on('mouseover',function() {
                    for(var key in layerInfos) {
                        if(layerInfos[key].hasBold) {
                            layerInfos[key].setStyle({dashArray:'0', weight:2, color:'#ffffff'});
                            layerInfos[key].hasBold = false;
                        }
                    }
                    activeGB = 0;
                });
			}});
		geoJson.on('dblclick', function(evt){
			console.log(evt);
		});
		map.addLayer(geoJson);
		// 存储行政区划
		layercache[gbcode] = geoJson;
		// 绘制国界,国界不存在的时候才绘制国界
		if(gbcode == '156000000' && !gbborder){
			gbborder = true;
			addChinaBorder(gbcode);
		}
	}
	
	/**
	 * 添加国家边界
	 * @param gbcode 国标码
	 */
	function addChinaBorder(gbcode){
		// var postData = {'gbcode':gbcode};
		// $.ajax({
		// 	url:'./zhfw/gborder',
		// 	data:JSON.stringify(postData),
		// 	dataType: 'json',
		//     contentType: "application/json",
		// 	type:'POST',
		// 	success:function(result){
		// 		if(checkedNodes.length == 0){
		// 			gbborder = false;
		// 			return;
		// 		}
		//
		// 		clearGbGeojson();
		//
		// 		var regions = JSON.parse(result.geodata);
		// 		for(var f in regions.features){
		// 			regions.features[f] = L.GeoJSON.Encoded.prototype._decodeFeature(regions.features[f]);
		// 		}
		// 		// 国界
		// 		gbGeoJson = L.geoJson(regions, {
		// 			style:function(feature){
		// 				return {
		// 					weight:3,
		// 		        	fillOpacity:0,
		// 		        	color:'red'
		// 				};
		// 			}});
		// 		map.addLayer(gbGeoJson);
		// 		// 新疆边界
		// 		xjGeojson = L.geoJson(xjRegions, {
		// 			style:function(feature){
		// 				return {
		// 					weight:3,
		// 					opacity:1,
		// 		        	color:'#ecece8',
		// 		        	dashArray:15
		// 				};
		// 			}});
		// 		map.addLayer(xjGeojson);
		// 	},
		// 	error:function(){
		// 		throw '根据gbcode获取行政区域数据失败';
		// 	}
		// });
        if(checkedNodes.length == 0){
            gbborder = false;
            return;
        }

        clearGbGeojson();

        var regions = {"type": "Feature", "features": [{"geometry": {"type": "MultiLineString", "coordinates": ["qmnbCqu}qSbAhnA{|TfnQbsHvkc@~f@dwv@idh@tty@ihPxgCkmTvq~@wz~@t_NkxXvnR}bUgz[qhm@koLwpTxq`@`bJzy~@ioUtxMhaIfs_Agtq@fk_Aqve@`ei@tyV`cSxu\\hppA|u^aqJh`XfkXybDhz]fw\\dsa@qrThov@dqz@z}\\qrw@t}}@pbf@x_Uq`c@dmg@p~_A~to@whFhbZmkWblMsi]j_mAt|z@x_h@bL|ck@j_Lpy]kdNhkd@|hm@r~Vx{t@kuOlrY}rYlpd@qaK`ut@|ySnrg@skE_zTpal@jlNron@iitBhoe@vmPrdg@vj`@jf]b}Klm\\qwPh_\\tmM`rb@a}o@xir@mfq@k`Bkn^|beBvdG`sUibOv{b@}slAiyg@ova@zxJab\\e|g@ssb@dqCelGbt\\fjEj|n@wfRp_l@{wUm|Jmlv@~gKay}@f`f@uvi@o_a@pMp}{@l_Jnk`Bvvj@`tmA{}M`wTqsd@sqe@ym`@e_Aw}^vuLbfB~hXoav@gwD}jVwtXiga@moBwiq@{tVf|HigT{b_AefdAgwJmsSy_f@wuO{ihAabn@}ewBaeDiioAf|K_pcAgp@}iSvvq@f~Z~|Wu}_@t_OefwA`qQ_mj@bxk@wpa@~_bAzewA|qp@p~MqoR`df@``fAyt]halAajd@xwk@yaLnf\\jhEd}w@_qRzcUj_YtesAfxk@rd^jz`A`esCp_Cfqp@fimAplnArt]jvGlsL~}f@~cKf~jBg`L~kkAfzRbu`B_dr@trZgz|@u~AcnSj~uAmg_@ezEovf@~iFsh]jkv@dgf@~mu@wyg@huz@|yGvkYahG~}h@skW|sh@lmI~gVg_S`bi@xsMbyj@`|w@xel@xmMdjY~r~@tgZpdRk|Nnf\\rng@wvm@fnd@u{qAciSsbWpyGypQfai@htWvvg@|hF~dk@n|MtpMukOlxu@rg[zhRarH|f\\xhCvwxAe}q@tlhAgn@rj[vhe@hk^mrMdbi@doLdlk@sxs@~l\\apVlnc@|pCnev@u`L|et@_tt@}}PkxJ||Y~sTdvf@kg_@ttk@et]xemAs_\\wgBeem@tgW}nCtuz@hvZnbc@kaZv`c@uqu@frc@mzWzc~@saDjo`@eoj@b~e@czV~i}@{}n@xho@qbWz}eAp}Cp{j@jhh@rkArx^pfWep@pcb@k}d@fxJayKzqe@op]fjk@k`Ix|q@ebUjq{@mh{@xju@ylObxsA|eMjwRqjPx|h@czSrdBywh@v~m@qfn@ioQi|i@xke@syRgmVcdj@jj|@_l]ysI{{l@|oUcx_@ghcAvos@upKlsRom^ytb@a|u@apNicGmjbAdyFi{j@vkPwt\\zqYisSpfd@{zm@|u]}pIcpOguu@|~Bog`Aaax@oyc@fj~@}jQ`lqAidVv{Oie[_xEuqeA|wl@ayVmfA}x]`vg@lhLfdVw|Bjtz@mcW~j|@ytLxa|@_|h@|gn@tkIhn]k`C~~h@ex_@xiZ{kNbuJofOudLevqAveM{~^btr@nmF~tj@mn^n|CqcZhbv@vgLfnq@_`Ypmc@vdJvlXm{FjjLmbPbiB{gN{_DtgA}dZozI_|QtpLmiLifVq{|@uk\\dfD_|Slsj@amsAayF{bMjpR}x`@tdDijf@_mMw}Vduk@}wKncm@oOd}t@njVh~NkeLhjm@yuv@xdQ{lXecFesdA`gq@kyMktT_qCwmt@cgVicO_gm@zwSo}q@eed@|]yrx@goc@ovp@y~Lgcf@yp_@{bIvfLaj[xZejo@{th@_qbAv{x@ypNtjKc_s@cuNgvGuCk`kAi~Noba@i}]}`Vyd_AegRcySsrg@rwI{k|@{t@usfA}rZekd@mcQwzy@suYucDwbAc}i@ccNkdr@oha@eky@mmNy|t@otOkzS_sNw{uAw_[a_U}G{yq@_s`@eyCy~TkpUazz@ruVwnf@qaRcfQkn_AcdYplb@a`SiviA_}z@hsF{idAz_l@}i`C|_a@yo[awHyfe@tes@|}DvvTkrU|oYksYglg@h^mmx@s`MslNkfBiotAs}Swaz@w}Cwuo@_bW_|}@pr]{c\\ykAu_bAdmKqlg@cjG}aTwff@rqFsfUnir@o}mAqxIylFepVwlb@meJmf`Aajh@{`d@m_K{piAmgg@ib^grFpuHuq_A~|Tcue@|dPuvdAyiC_cLaz@wivCbkZgob@mdf@uaeAg[gnl@kk^_|\\moe@~JavTtsLo~zAv{LqnXycA}`j@y~]svM{be@tYid}@}yTyefAkdw@cjk@}l]vtP{s[g|_@qz@ckz@tgMejk@mhLc{KwiEq_~@lp]_~JrdY~vZt`f@ee`A|oS~mRxzMwnv@ty`@s}cA`y[sfE|rLc~x@buVqbX{kGagdBvvd@eza@ff@cnb@hxa@k}rAhx^epRze_@ulBtmy@ikn@bkLaf`@hcp@_{Zxj[crDxno@bjb@tqw@wgX|sx@n{z@j~m@`vGbmJmpRh{l@{~^caCk`d@zbNyfUqyBwad@diP_xc@g{@er|AlpKyfZhrAszo@ywGilw@r}M{umCvty@waiCrz\\_e\\bhLqhn@j{RymTbkQeyv@msGicnApqs@vvNhaC}~e@~mrB_i`Abxa@ydIjy`AirwAj_a@ixC_yDqgrBczFu{d@ltZ{bgEl{Omi~Fg_OiyyArlA}jy@w`Ie{Hp|A}rfBfr[kkkC~gC}ml@lnu@e~t@luN}fgAii@qdr@~ts@cshCb~NwguAqVewi@izLidwAjwh@zm@xh@y~lAdcMkoPql_@whv@oed@yirAmucAukoE{bM{`}A_tQgce@taHe`Txt@ureAkyJwq|@j}KyesBuxJ{wa@pjC}_s@i}Eg`p@{s^e}eAcqFywl@gcT_qy@wkoB}|yB{i]s_hB{a^grc@kbCwa^ujo@|oNowa@xds@seu@xoa@oib@ygZgsf@s}Iucf@uy[mzT{zk@l}A{hrAhi[_e`@pxPinp@jrQ}vwCiq_@act@qdBqh]y|d@}ew@cpr@yte@whIche@z}Jshm@}qAupiAapLge`Askj@e{`AqoPslp@}gd@ndBaz^{wYsle@udq@ijKoia@jsCitgBu|i@wzGonCsy`@lpLyvn@gnf@ygzAvlG_hu@qnIgdsA~nRkiQv_Gu|t@}zJ_peBm`m@qjBcoVdeYon`@neNy{f@zw`AcrNrbAkpKfqi@w{Vd~BmkT`ffAqsi@|}e@{oHzk_AlhDf}qAb`hAf|rA{ub@tpw@wtLlgi@rsIdbrAgsFj`c@~me@tg~@ssm@fqeAwql@f`IcgSyyw@ads@r~Cg`x@aev@syHlaF_h~DmwcCre^qbbAfnJkwoAppT{l_AeyQidt@iz|@{l_B_tI{adBqsV}jd@qcg@iyP{hFrab@a_`Acgd@iaO_tVysZidBkvZcef@{ol@ydPwbVmb^{~u@}`XfEutMm}f@orz@{eHwub@q~l@mhV{n]j{\\}wj@wvJycSrei@xxKx`lAmof@qgCi~Naoe@itmAeogBup@umlAytIkbt@gcQuzhAbc@a{i@}tM{nr@|`I_zKeeBoqzAckRmngAbj@_ut@fqK{c}@~xZ_mr@{dE{zTf{]w`f@ryN}lnAs}IuqYfFogl@~oUgwoAlpYixTtic@kzo@s`G_dIpcGenMluZzvYbmJwbf@|~Ygg^jdRx{AdpDknVpnO`yYxeM}|p@||f@taKphf@gaj@l_^`a@ppG{cYlml@a~X|yl@zqI~bXeef@bjdAqmo@|_n@~vFrxQgnu@xi`@llSxdo@ukCteGa_Vdnd@af`@f~HwseAojLu~fAn{Fcu`@adEkgFpnE{cIbaN|pKpxDqdt@jhR}wJgCwnKywGuoM|^k}GnlFkxHkoO_lV|}GgtTnhSkwBj@ch\\~|XosUbkLqcSv_Ka`AlmBc|NjrVmfe@g{Awgj@`mJ}jQkpCi}\\zgNpuKzbd@jcNx~QchQzgDqoXbpb@wwLvl`@bf`@|`d@aaf@bmo@ok^}mGybg@lPi||@`iJkyx@ccFec\\clD}duB_td@gaJ`@_r[wib@csm@g^eocBcuZmhc@{aXw{uAe}F_o}@vmAmlb@dhGaaMugAyjLiyKa{M}vAim]lfC_pDvhFzUpfVv`fAt`y@|aa@~bo@wal@dzq@nph@fdHrvp@txa@nx]ziL{iM|sNlb@|rAz_On_PtvFf{AzqCrbb@zhIvsa@huBvi]ba^zvDaaA~FsbG`lH_eHntCdpAfmAvvG~hP{eEbcnAvl_AufC`kNjz{@jnVfbLp__@|mk@~`Ypa]ebG|pSxdc@ksk@|uvD}eP|eWhhk@vrf@|q[`bp@`cCnrt@b|Wfoc@brTkcZpx`Cu~e@vah@zhQ`b`Ak`P`qqBxuc@|dKp}j@|\\ztj@dzMpgf@~kZct]dsPbvOy_f@fox@q|\\}vEsoRh{kA~sv@n}Undm@~aBzhJzoo@gpGr}Xbzo@vo]`me@phy@y`Adv_D~vj@kuBjmg@wkg@hpk@xhf@kvMdj[~sD|q~@kdL|{QntAlfe@ayMnoa@smt@xun@dzOzpOlpStlu@``o@tjMlvi@rqi@fqKfo\\feh@r~_@xqAhgo@bid@|vv@tjKl|m@hxn@f{uAlnw@lokA", "c~zaBm}bzShfpAox{@vyx@aa\\rd_AigQ", "cvuiAioj`T~zt@xl@n{o@pmFpi^nvHn}Q~jGpbg@rjV", "ordj@morsS|aeAn_Ez{cA_cC~}l@gyFrsUmhF", "_vxS_{iiTsoCwgZwpQwyiAkfNask@glZuhz@", "iavo@opndUr}_DxigC", "{wbhAk|duU|eh@f|IledA~bXt}k@|uS|eu@|a\\", "usy`BeduuUjffEbM", "i`|rByfl{UdaaCrbkA`bWd|Itec@fsN", "oxlcCa{agVpbiDjaoC", "w`ouCurrlV~g`Ehs]"]}, "type": "Feature", "properties": {"GB": "156000000"}}]};
        for(var f in regions.features){
            regions.features[f] = L.GeoJSON.Encoded.prototype._decodeFeature(regions.features[f]);
        }
        // 国界
        gbGeoJson = L.geoJson(regions, {
            style:function(feature){
                return {
                    weight:3,
                    fillOpacity:0,
                    color:'red'
                };
            }});
        map.addLayer(gbGeoJson);
        // 新疆边界
        xjGeojson = L.geoJson(xjRegions, {
            style:function(feature){
                return {
                    weight:3,
                    opacity:1,
                    color:'#ecece8',
                    dashArray:15
                };
            }});
        map.addLayer(xjGeojson);
	}
	
	/**
	 * 清除国界
	 */
	function clearGbGeojson(){
		// 存在国界删除国界
		if(gbGeoJson){
			map.removeLayer(gbGeoJson);
			map.removeLayer(xjGeojson);
			xjGeojson = gbGeoJson = null;
			gbborder = false;
		}
	}
	
	/**
	 * 根据gbcode获取它应该缩放的级别
	 */
	function getZoomByGbcode(gbcode){
		var zoom;
		// 国家级别
		if(gbcode == '156000000'){
			zoom = '4';
	    // 省级别
		} else if (gbcode.substr(-4) == '0000') {
			zoom = '7';
		// 市级别
		} else if (gbcode.substr(-2) == '00') {
			zoom = '9';
		}
		return zoom;
	}
	
	/**
	 * 根据级别和gbcode存储各个级别的gbcode
	 */
	function setGbcodeByZoom(gbcode){
		var zoom = map._animateToZoom;
		if(zoom >= 4 && zoom <= 6){
			stateGb = '156000000';
			provinceGb = cityGb = undefined;
		} else if(zoom >= 7 && zoom <= 8){
			provinceGb = gbcode;
			cityGb = undefined;
		} else if(zoom >= 9 && zoom <= 11){
			cityGb = gbcode;
		}
	}
	
	/**
	 * 判断是否是直辖市
	 */
	function isMunicipalities(gbcode){
		if(gbcode == '156110000' || gbcode == '156120000' || gbcode == '156310000' || gbcode == '156500000'){
			return true;
		}
	}
	
	/**
	 * 生成属性查新弹出框
	 * @param cname   中文名称
	 * @param gbcode  行政区划code
	 */
	function propertiesBox(cname, gbcode){
		// var postData = {'gbcode':gbcode};
		// $.ajax({
		// 	url:'./zhfw/gbinfo',
		// 	data:JSON.stringify(postData),
		// 	dataType: 'json',
		//     contentType: "application/json",
		// 	type:'POST',
		// 	success:function(result){
		// 		var properties = [];
		// 		if(result.heads){
		// 			properties = parseProperties(result);
		// 		}
		// 		var tips = [], cols = [], props = [], prop = {}; // [{properties:properties},]
		// 		if(properties.length == 0){
		// 			tips.push('资料暂缺！');
		// 		} else {
		// 			for(var i = 0; i < properties.length; i++){
		// 				props.push(properties[i]);
		// 				if((i+1)%10 == 0){
		// 					prop.properties = props;
		// 					cols.push(prop);
		// 					prop = {};
		// 					props = [];
		// 				}
		// 			}
		// 			if(i%10 != 0){
		// 				prop.properties = props;
		// 				cols.push(prop);
		// 			}
		// 		}
		//
		// 		var json = {title:cname, cols:cols, tips:tips};
		// 		var htmlPopup = MT.render(T['popup'], json);
		// 		$('#app').children('.property_popup').remove();
		// 		$('#app').append(htmlPopup);
		// 	},
		// 	error:function(){
		// 		throw '根据gbcode获取行政区域属性失败';
		// 	}
		// });

        var properties = [];
        for(let i=0;i<datas.length;i++){
        	if(datas[i].data.gbcode==gbcode){
                properties = parseProperties(datas[i]);
				break;
			}
		}
        var tips = [], cols = [], props = [], prop = {}; // [{properties:properties},]
        if(properties.length == 0){
            tips.push('资料暂缺！');
        } else {
            for(var i = 0; i < properties.length; i++){
                props.push(properties[i]);
                if((i+1)%10 == 0){
                    prop.properties = props;
                    cols.push(prop);
                    prop = {};
                    props = [];
                }
            }
            if(i%10 != 0){
                prop.properties = props;
                cols.push(prop);
            }
        }

        var json = {title:cname, cols:cols, tips:tips};
        var htmlPopup = MT.render(T['popup'], json);
        $('#app').children('.property_popup').remove();
        $('#app').append(htmlPopup);
	}
	
	/**
	 * 将查询结果转化为属性框所需要的格式
	 * @param result  包含属性的JSON
	 */
	function parseProperties(result){
		var pcs = currentNode.propertyColumns.split(",");
		var properties = [], prop, pc, cname, value;
		for (var i in pcs){
			prop = {};
			if(!result.heads[pcs[i]]){
				continue;
			}
			prop['title'] = result.heads[pcs[i]]?result.heads[pcs[i]]:'暂无';
			prop['info'] = result.data[pcs[i]]?result.data[pcs[i]]:'暂无';
			properties.push(prop);
		}
		return properties;
	}
	
	/**
	 * 清空行政区划信息
	 */
	function clearDistrictInfo(current, checkedDatas, staticCheckedNodes){
		// 清除行政区划代码缓存
		if(current.subjectType == '2'){
			provinceGb = cityGb = undefined;
			if(staticCheckedNodes.length == 0){
				$('.dlbtips').remove();
			}
		}
		if(current.subjectType == '1'){
			map.removeLayer(layercache['000000000']);
			delete layercache['000000000'];
		} else {
			clearGbGeojson();
			for(var gb in layercache){
				if(gb != '000000000'){
					map.removeLayer(layercache[gb]);
					delete layercache[gb];
				}
			}
		}
		checkedNodes = checkedDatas;
		// 行政区划全部取消
		if(checkedNodes.length == 0){
			// 清除地图点击事件
			map.off('click', mapClickFunc);
			// 清除地图级别发生变化事件
			map.off('zoomstart', mapZoomStartFunc);
			map.off('zoomend', mapZoomEndFunc);
		}
	}
	
	/**
	 * 设置透明度
	 * @param code 			 专题code
	 * @param opacityStore   透明度集合
	 */
	function setOpacity(code, opacityStore){
		fillOpacity = opacityStore[code]||0.7;
		if(!geoJson){
			return;
		}
		geoJson.setStyle({fillOpacity:fillOpacity});
	}
	
	return {
		loadDistrictInfo:loadDistrictInfo,
		clearDistrictInfo:clearDistrictInfo,
		setOpacity:setOpacity
	}
});