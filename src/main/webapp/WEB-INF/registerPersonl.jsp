<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<% 
		// 将过期日期设置为一个过去时间 
		response.setHeader("Expires", "Sat, 6 May 1995 12:00:00 GMT"); 
		// 设置 HTTP/1.1 no-cache 头 
		response.setHeader("Cache-Control", "no-store,no-cache,must-revalidate"); 
		// 设置 IE 扩展 HTTP/1.1 no-cache headers， 用户自己添加 
		response.addHeader("Cache-Control", "post-check=0, pre-check=0"); 
		// 设置标准 HTTP/1.0 no-cache header. 
		response.setHeader("Pragma", "no-cache"); 
		%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>注册</title>
		<meta http-equiv="pragma" content="no-cache" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="keywords" content="0" />
		<meta http-equiv="description" content="0" />
		<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" media="screen" />
		<link href="<%=basePath %>new/css/common/commonNew.css" rel="stylesheet" type="text/css" />
		<link href="<%=basePath %>new/css/trade/trade.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="register">
		<div class="register_top">
			<div class="box">
				
			</div>
		</div>
		<div class="tab_click" >
			<div class="tab_son">
				<form id="p_registerForm">
				 <img src="<%=basePath %>new/images/cms/img/register_01.gif" alt="" />
					<div class="box1000 username">
						<div class="box_title"><span class="star">*</span>用户名：</div>
						<div class="box_text">
							<input type="text" class="text width295" name="user.userName" id="p_user_userName" tabindex="1"/>
							<div class="hint"><div class="arrows"></div>请输入3-30位以字母或中文开头的字符，不能含有特殊字符!</div>
							<div class="jquery_valid_error" style="display: none"></div>
							<div class="success_tip" style="display: none">该用户名可用</div>
						</div>
					</div>
					<div class="box1000 password">
						<div class="box_title"><span class="star">*</span>创建密码：</div>
						<div class="box_text">
							<input type="password" class="text width295" name="user.password" id="p_user_password"  tabindex="2"/>
							<div class="hint"><div class="arrows"></div>密码长度为6-20位!</div>
							<div class="jquery_valid_error" style="display: none"></div>
							<div class="success_tip" style="display: none">该密码可用</div>
						</div>
					</div>
					<div class="box1000 password">
						<div class="box_title"><span class="star">*</span>确认密码：</div>
						<div class="box_text">
							<input type="password" class="text width295" name="passwordAgain" id="p_passwordAgain" tabindex="3"/>
							<div class="hint"><div class="arrows"></div>与上一密码相同!</div>
							<div class="jquery_valid_error" style="display: none"></div>
							<div class="success_tip" style="display: none">该密码可用</div>
						</div>
					</div>
					<div class="box1000 code">
						<div class="box_title"></div>
						<div class="box_text">
							<input type="checkbox" class="checkbox" checked="checked" id="p_dealInput" onclick="agreeDeal(this,'p')"  tabindex="18"/>我已阅读并同意<a href="javascript:dealTerms();">《短信服务平台条款》</a>
						</div>
					</div>
					<input type="submit" class="submit btn_yellow" value="立即注册" id="p_register" tabindex="20"/>
				</form>
			</div>
		</div>
		
		<div id="dealTermsDiv" style="display:none;" >
		<div  style="text-align: center">
		<textarea readonly="readonly" tabindex="20" rows="20" cols="100">
短信平台服务协议
一、 基本术语解释
为清楚服务内容和服务条款之目的，明确有关术语如下：
1、 “满意通达”系满意通达（北京）软件技术有限责任公司的简称。
2、 “满意通”系满意通达提供的全国物流信息平台及服务体系，提供全国各地的货源、车源、专线的发布与搜索功能。
3、 “满意达”系满意通达提供的在线物流管理平台及服务体系，提供涵盖物流运输全过程的信息化管理功能。
4、 “代理商”系由满意通达授权在各省市代理满意通达业务的公司或个人。
5、 “物流商”系加入满意通达物流联盟的货运、运输、配货、专线、配送等物流公司。
6、 “终点站”系由满意通达授权在各乡镇进行货物收发的公司或个人。
7、 “注册”系指在满意通和满意达内获得会员资格的行为。
8、 “申请”系指向满意通达或满意通达联盟成员提出获得满意通达相关服务请求的行为。
二、 会员的承诺与保证
1、 承诺遵守满意通达的相关规定，包括但不限于本条款。
2、 保证向满意通达提供的申请注册信息是真实、准确、完整的，并且没有任何引人误解或者虚假的陈述。
3、 保证同意本条款之效力如同亲自签字、盖章的书面条款一样，对申请注册者具有法律约束力。
4、 保证所申请注册后获得的服务不会被用于任何非法目的，保证满意通达不会因提供相关服务而构成违法。
5、 保证不会因为使用满意通达的服务而影响满意通达的服务形象、服务质量和商业利益。
6、 保证不会通过满意通达提供的服务从事非法活动，包括但不限于误导、引诱、欺骗等。
7、 保证不会因为在使用服务时使满意通达面临或被牵涉进任何第三人提出的诉讼、索赔等；如上述事件发生，承诺补偿满意通达因该等事件而发生的任何损失（包括但不限于诉讼费、律师费、赔偿金等）。
三、 会员的权利与义务
1、 注册/申请成功后按照本条款的规定依法享受满意通达提供的对应服务。
2、 注册/申请者在申请注册时应如实向满意通达提交所要求填写的全部真实信息。
3、 会员向满意通达提交的信息在服务条款有效期内发生任何变更，均应及时通知满意通达或为其提供加盟服务的满意通达联盟。由于未能按时通知带来的一切不利后果应自行承担。
4、 会员不得转让、出租、交换满意通达免费提供或作为促销手段赠送的服务或服务期。
5、 申请/注册者应完全履行其在本条款下的义务，包括但不限于应满意通达要求提交相应的证明材料等。否则，申请/注册者应自行承担由此造成的一切不利后果。
四、 满意通达的权利保留与免责
1、 满意通达拥有本服务条款维护权、修改权、解释权。任何由满意通免费提供或作为促销手段赠送的服务或服务期，满意通达保留调整、变更甚至撤销的权利。
2、 鉴于满意通达无法对申请者提供的信息的真实性进行全面的审核，由此造成的争议解决，满意通达不承担任何法律责任。
3、 满意通达保证会员注册程序的合法性，但不能保证信息来源的真实合法，更不能保证其延伸行为的合法性，任何人不应依此判断会员现实行为的合法性。但满意通达保留要求申请/注册者提供材料证明其行为合法的权利。
4、 会员因为使用服务所发生的任何纠纷而导致的经济、法律责任均与满意通达无关，因此而引起的与第三方的纠纷，满意通达均不充当调停人，由使用者自己负责处理并且承担相应的法律责任。
5、 由于会员本身或满意通达联盟成员的过错导致遭受损失的，满意通达不承担任何经济、法律责任。
6、 因不可抗力导致满意通达不能履行其义务时，满意通达不承担任何经济、法律责任。
7、 任何人发现满意通达联盟成员、车辆会员、货主会员有可能或已经违法并有确凿证据者（如：车牌号码与车辆驾驶员的信息不一致时），可向满意通达举报解决。
五、 服务期、服务的终止及违约责任
1、 申请/注册者违反服务条款和满意通达的有关规定，包括但不限于违反申请/注册者的陈述与保证，以及在本条款中援引或者提到的任何其他规定和规章等。
2、 申请/注册者提供的信息不真实；提供虚假或者引人误解的信息，或者隐瞒任何重大信息，或者故意不更新有关信息。
3、 申请/注册者利用满意通达的服务进行或存在违背国家法律法规、道德规范的情形，引起司法反应或社会指责。
4、 满意通达有充分理由认为，该会员面临承担民事或者刑事责任。
5、 满意通达有权根据业务发展的需要，对信息服务形式和服务内容加以更新。
六、 不可抗力
1、 因不可抗力或者其他意外事件，使得本服务条款履行不可能，遭受不可抗力或意外事件的一方不承担责任。
2、 “不可抗力““意外事件“是指不能预见、不能克服或避免的且对一方或双方当事人造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、立法，政府行为等。
3、 鉴于互联网的特殊性，如黑客攻击、网络中断等，凡出现非满意通达过错之情形的，应当视为不可抗力。
七、 附则
1、 本服务条款的部分条款若被司法机关或仲裁机构认定为无效，不应影响其他条款的效力，也不影响本服务条款的解释、违约责任及争议解决的有关约定的效力。
2、 本服务条款的效力、解释、履行和争议解决均适用中华人民共和国法律，并应参照满意通达制定的有关政策以及计算机、互联网行业的规范。
3、 满意通达有权修改本条款、服务规范、服务形式等，并在满意通达网站、满意通全国物流信息平台、满意达在线物流管理平台上披露提示有关内容，但不另行通知。注册者如果不同意改动内容，可以主动取消获得的服务；如果注册者继续接受服务，则视为无条件接受有关变动。
4、 对本条款的理解与解释应依据条款目的和文本原义以及业界通行的理解和惯例进行，标题仅供参考，不应在解释本条款时加以援引。
5、 满意通达有权将本条款和服务规范项下的权利义务转让给第三人。当出现满意通达被收购或与第三人合并等情形时，其权利义务由承继者继承。
						</textarea><br/>
						<input type="button" class="btn_yellow margin_top" value="阅读完毕" onclick="readOver();" style="width: 110px;height: 30px;" >
						</div>
		</div>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery-1.8.0.min.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery-form.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery.validate.min.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/layer/layer.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/commonNew.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/iframe.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/trade/common/menu.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/trade/common/tradeNavBars.js"></script>  
	    <script type="text/javascript" src="<%=basePath %>new/js/info/infoValidate_expand.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/jquery/jquery-Validate_expand.js"></script>
		
		
		<script type="text/javascript" src="<%=basePath %>new/js/common/register/registServChk.js"></script>
		<script type="text/javascript" src="<%=basePath %>new/js/common/register/register.js"></script>  
		<script type="text/javascript">
			$(document).ready(function(){
				var flag ="${param.flag}";
				$(".titles li").eq(flag).click();
			});
		</script>
	</body>
</html>