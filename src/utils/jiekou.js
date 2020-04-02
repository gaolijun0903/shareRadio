Broadcast - h5
一、获取主播信息
Broadcast / GetAnchorInfo GET

参数：
anchor_id    int    主播ID

返回值：
anchor_id    int       主播ID
user_nickname    string    用户昵称
signature    string    个性签名
avatar    string    头像
is_live     int       是否直播
praise    int       点赞数
browse     int       浏览数
live_path    string    直播地址

修改接口意义：
1、
接口文档地址：

二、主播节目列表
Broadcast / GetProgramList GET

参数：
anchor_id    int   主播ID
source    int   来源（1乘客端、2司机端）
page    int    当前页
page_size    int  每页显示条数

返回值：
program_id    int       节目ID
anchor_id    int       主播ID
start_time    int    开始时间
end_time    int    结束时间
program_name    string    节目名称
material_name    string    素材名称
material_tag    string    标签名称
material_image    string    节目图片
material_playtime    string    节目时间
anchor_name    string    主播名称
is_favorite    int       是否已添国回放（1是、0否）

修改接口意义：
1、
接口文档地址：

三、节目回放列表
Broadcast / GetProgramFavoriteList GET

参数：
source  int  来源（1乘客端、2司机端）
u_code  string  加密的用户ID（司机端原来用的driver_code，现在改成u_code）

返回值：
program_id    int       节目ID
anchor_id    int       主播ID
program_name    string    节目名称
material_name    string    素材名称
material_tag    string    标签名称
material_image    string    节目图片
material_playtime    string    节目时间
anchor_name    string    主播名称
is_favorite    int       是否已添国回放（1是、0否）


修改接口意义：
1、
接口文档地址：

四、节目详情
Broadcast / GetProgramInfo GET

参数：
program_id  int  节目ID

返回值：
program_id    int       节目ID
anchor_id    int       主播ID
program_name    string    节目名称
material_name    string    素材名称
material_tag    string    标签名称
material_image    string    节目图片
material_playtime    string    节目时间
material_path    string    节目播放地址
