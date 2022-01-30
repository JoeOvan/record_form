<template>
	<view class="wrapper">
		
		<view class="header-wrap">
			<image class="bg-index" src="../../static/bg_index.png"></image>
			<view class="copyright">信宜市人民政府网</view>
			<view class="title">
				信宜市来（返）乡人员备案登记
			</view>
		</view>

		<view class="title-wrap">
			<!-- <h1 class="title">信宜市来（返）乡人员备案登记</h1> -->
			<view class="tips">注：请提前准备好粤康码和行程码截图，避免中途退出！<br/>
			提交成功时，请截图屏幕保存。
			</view>
		</view>
		
		<view class="survey-wrap">
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">1.姓名：</text>
				</view>
				<view class="item-content">
					<input v-model="name" type="text" class="input-text" placeholder="请输入姓名">
				</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">2.身份证号码：</text>
				</view>
				<view class="item-content">
					<input v-model="idNumber" type="text" class="input-text" placeholder="请输入身份证号码">
				</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">3.手机号码：</text>
				</view>
				<view class="item-content">
					<input v-model="mobile" type="text" class="input-text" placeholder="请输入手机号码">
				</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">4.核酸检测结果：</text>
				</view>
				<view class="item-content">
					<view class="radio-group-wrap">
						<u-radio-group
							v-model="surveyValue4"
							placement="column"
							@change="groupChange4"
							activeColor="#00BA27"
							>
							<u-radio
								:customStyle="{marginBottom: '20px'}"
								v-for="(item, index) in surveyList4"
								:key="index"
								:label="item.name"
								:name="item.value"
								labelColor="#000000"
								size="18"
								labelSize="16"
								>
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">5.粤康码（健康码）</text>
				</view>
				<view class="item-content">
					<view class="radio-group-wrap">
						<u-radio-group
							v-model="surveyValue5"
							placement="column"
							@change="groupChange5"
							activeColor="#00BA27"
							>
							<u-radio
								:customStyle="{marginBottom: '20px'}"
								v-for="(item, index) in surveyList5"
								:key="index"
								:label="item.name"
								:name="item.value"
								labelColor="#000000"
								size="18"
								labelSize="16"
								>
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">6.粤康码（健康码）截图</text>
				</view>
				<view class="item-content">

						<u-upload
							:fileList="fileList6"
							@afterRead="afterRead"
							@delete="deletePic"
							name="6"
							multiple
							:maxCount="1"
							:maxSize="3145728"
							accept="image"
						></u-upload>
					
				</view>
				<view class="item-tips">最多上传1个文件，大小限制3Mb，可上传图片类文件，后缀格式为jp(e)g / png / bmp / gif</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">7.行程卡</text>
				</view>
				<view class="item-content">
					<view class="radio-group-wrap">
						<u-radio-group
							v-model="surveyValue7"
							placement="column"
							@change="groupChange7"
							activeColor="#00BA27"
							>
							<u-radio
								:customStyle="{marginBottom: '20px'}"
								v-for="(item, index) in surveyList7"
								:key="index"
								:label="item.name"
								:name="item.value"
								labelColor="#000000"
								size="18"
								labelSize="16"
								>
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">8.行程码截图</text>
				</view>
				<view class="item-content">
					<u-upload
						:fileList="fileList8"
						@afterRead="afterRead"
						@delete="deletePic"
						name="8"
						multiple
						:maxCount="1"
						:maxSize="3145728"
						accept="image"
					></u-upload>
				</view>
				<view class="item-tips">最多上传1个文件，大小限制3Mb，可上传图片类文件，后缀格式为jp(e)g / png / bmp / gif</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">9.备案登记日期</text>
				</view>
				<view class="item-content">
					<u-calendar :show="isSurveyShow9" @confirm="confirm9" confirmText="备案登记日期" :showLunar="true" @close="closeSurveyShow9" :closeOnClickOverlay="true"></u-calendar>
					<view class="btn-calendar" @click="isSurveyShow9 = true">{{ surveyValue9 || '请选择'}}</view>
				</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">10.来（返）乡日期</text>
				</view>
				<view class="item-content">
					<u-calendar :show="isSurveyShow10" @confirm="confirm10" confirmText="来（返）乡日期" :showLunar="true" minDate="2021-06-01" maxDate="2022-06-01" :defaultDate="defaultDate" monthNum="12" @close="closeSurveyShow10" :closeOnClickOverlay="true"></u-calendar>
					<view class="btn-calendar" @click="isSurveyShow10 = true">{{ surveyValue10 || '请选择'}}</view>
				</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">11.是否从中高风险区来（返）乡</text>
				</view>
				<view class="item-content">
					<view class="radio-group-wrap">
						<u-radio-group
							v-model="surveyValue11"
							placement="column"
							@change="groupChange11"
							activeColor="#00BA27"
							>
							<u-radio
								:customStyle="{marginBottom: '20px'}"
								v-for="(item, index) in surveyList11"
								:key="index"
								:label="item.name"
								:name="item.value"
								labelColor="#000000"
								size="18"
								labelSize="16"
								>
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">12.本人户籍所在地</text>
				</view>
				<view class="item-content">
					<view class="address-wrap">						
						<view class="address-select">						
							<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion12">
								<h2>{{regionName12 || '请选择'}}</h2>
							</pick-regions>
						</view>
						<view class="address-detail">
							<input v-model="censusAddress" type="text" class="input-text" placeholder="请输入详细地址...">
						</view>
					</view>
				</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">13.出发地</text>
				</view>
				<view class="item-content">
					<view class="address-wrap">						
						<view class="address-select">						
							<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion13">
								<h2>{{regionName13 || '请选择'}}</h2>
							</pick-regions>
						</view>
						<view class="address-detail">
							<input v-model="startAddress" type="text" class="input-text" placeholder="请输入详细地址...">
						</view>
					</view>
				</view>
			</view>
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">14.目的地所属村（社区）</text>
				</view>
				<view class="item-content">
					<view class="address-wrap">						
						<view class="address-select">						
							<u-picker :show="isSurveyShow14" :columns="surveyColumns14" keyName="label" @confirm="confirm14" @close="closeSurveyShow14" @cancel="closeSurveyShow14" :closeOnClickOverlay="true"></u-picker>
							<view class="btn-village" @click="isSurveyShow14 = true">{{ surveyLabel14 || '请选择'}}</view>
						</view>
						<view class="address-detail">
							<input v-model="endAddress" type="text" class="input-text" placeholder="请输入详细地址...">
						</view>
					</view>
				</view>
			</view>
			

			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">15.返乡使用的交通工具</text>
				</view>
				<view class="item-content">
					<view class="radio-group-wrap">
						<u-radio-group
							v-model="surveyValue15"
							placement="column"
							@change="groupChange15"
							activeColor="#00BA27"
							>
							<u-radio
								:customStyle="{marginBottom: '20px'}"
								v-for="(item, index) in surveyList15"
								:key="index"
								:label="item.name"
								:name="item.value"
								labelColor="#000000"
								size="18"
								labelSize="16"
								>
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
			
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">16.返乡行程安排（车次号/航班号/车牌号）</text>
				</view>
				<!-- <view class="item-tips">例如：高铁G6**、动车D7**、自驾粤K**</view> -->
				<view class="item-content">
					<u--textarea v-model="textarea16" placeholder="例如：高铁G6**、动车D7**、自驾粤K**" ></u--textarea>
				</view>
			</view>
			
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">17.行程逗留地点</text>
				</view>
				<!-- <view class="item-tips">XX省XX市XX（区、县）XX街道XX地方，逗留XX小时，若多次逗留，请用；隔开，否则填无</view> -->
				<view class="item-content">
					<u--textarea v-model="textarea17" placeholder="XX省XX市XX（区、县）XX街道XX地方，逗留XX小时，若多次逗留，请用；隔开，否则填无" ></u--textarea>
				</view>
			</view>
			
			
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">18.是否为入境人员</text>
				</view>
				<view class="item-content">
					<view class="radio-group-wrap">
						<u-radio-group
							v-model="surveyValue18"
							placement="column"
							@change="groupChange18"
							activeColor="#00BA27"
							>
							<u-radio
								:customStyle="{marginBottom: '20px'}"
								v-for="(item, index) in surveyList18"
								:key="index"
								:label="item.name"
								:name="item.value"
								labelColor="#000000"
								size="18"
								labelSize="16"
								>
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
			
			
			
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">19.是否特定行业从业人员</text>
				</view>
				<view class="item-content">
					<view class="radio-group-wrap">
						<u-radio-group
							v-model="surveyValue19"
							placement="column"
							@change="groupChange19"
							activeColor="#00BA27"
							>
							<u-radio
								:customStyle="{marginBottom: '20px'}"
								v-for="(item, index) in surveyList19"
								:key="index"
								:label="item.name"
								:name="item.value"
								labelColor="#000000"
								size="18"
								labelSize="16"
								>
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
			
			
			
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="sign">*</text>
					<text class="text">20.您的新冠疫苗接种情况</text>
				</view>
				<view class="item-content">
					<view class="radio-group-wrap">
						<u-radio-group
							v-model="surveyValue20"
							placement="column"
							@change="groupChange20"
							activeColor="#00BA27"
							>
							<u-radio
								:customStyle="{marginBottom: '20px'}"
								v-for="(item, index) in surveyList20"
								:key="index"
								:label="item.name"
								:name="item.value"
								labelColor="#000000"
								size="18"
								labelSize="16"
								>
							</u-radio>
						</u-radio-group>
					</view>
				</view>
			</view>
			
			
			<view class="item-wrap">
				<view class="item-title">
					<text class="text">21.其他补充内容</text>
				</view>
				<!-- <view class="item-tips">如：小孩没有身份证号码，可填写：姓名XX，年龄XX，性别XX</view> -->
				<view class="item-content">
					<u--textarea v-model="textarea21" placeholder="如：小孩没有身份证号码，可填写：姓名XX，年龄XX，性别XX" ></u--textarea>
				</view>
			</view>
			
			
			
		</view>
		
		
		<view class="handler-wrap">
			<button class="btn-submit" :disabled="!isDisable" @click="submit">提交</button>
		</view>
		
		<!-- 右滑拖动验证 -->
		<u-popup :show="isVerifyShow" mode="center"  @close="isVerifyShow = false" @open="isVerifyShow = true" :round="10">
			<view class="verify-wrap">
				<view class="verify">
					<view class="verify-title">请向右滑拖动完成验证</view>
					<sunui-mverify @change="confirmVerify"></sunui-mverify>
				</view>
			</view>
		</u-popup>
		
		
		<!-- 确认弹窗 -->
		<u-popup :show="isSubmitConfirmshow" mode="center" @close="isSubmitConfirmshow = false" @open="isSubmitConfirmshow = true" :round="10" :closeOnClickOverlay="false" :customStyle="{width: '690rpx'}">
			<view class="submit-confirm-wrap">
				<text class="tips">{{confirmSuccessText}}</text>
				<u-button type="success" class="btn-submit-confirm" text="请确认截图,再关闭!" @click="closeSubmitConfirmshow"></u-button>
			</view>
		</u-popup>
		
<!-- 		<view class="handler-wrap" style="top: 0;position: fixed;width: 100%;">
			<view class="btn-submit" @click="openSubmitConfirmshow">已提交</view>
			<view class="btn-submit" @click="verifyShow">验证</view>
		</view> -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//1.======================
				name: '',
				
				//2.======================
				idNumber: '',
				
				//3.======================
				mobile: '',
				
				//4.======================
				// 基本案列数据
				surveyList4: [{
					name: '核酸检测24小时阴性',
					disabled: false,
					value: 1
				},
				{
					name: '核酸检测48小时阴性',
					disabled: false,
					value: 2
				},
				{
					name: '核酸检测72小时阴性',
					disabled: false,
					value: 3
				}, {
					name: '近期无核酸检测结果',
					disabled: false,
					value: 4
				}, {
					name: '核酸检测阳性',
					disabled: false,
					value: 5
				}],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				// surveyValue4: '核酸检测24小时阴性',
				surveyValue4: 0,
				
				//5.========================
				surveyList5: [{
					name: '绿码',
					disabled: false,
					value: 1
				},
				{
					name: '黄码',
					disabled: false,
					value: 2
				},
				{
					name: '红码',
					disabled: false,
					value: 3
				}],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				surveyValue5: 0,
				
				// 6.===================
				fileList6: [],
				baseUrl: uni.$url.baseUrl,
				
				// 7.===================
				surveyList7: [{
					name: '绿色',
					disabled: false,
					value: 1
				},
				{
					name: '绿色（带*）',
					disabled: false,
					value: 2
				}],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				surveyValue7: 0,
				
				// 8.===================
				fileList8: [],
				
				// 9.===================
				isSurveyShow9: false,
				surveyValue9: null,
				
				// 10.===================
				isSurveyShow10: false,
				surveyValue10: null,
				defaultDate: new Date(),
				
				// 11.===================
				surveyList11: [{
					name: '是',
					disabled: false,
					value: 1
				},
				{
					name: '否',
					disabled: false,
					value: 2
				}],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				surveyValue11: 0,
				
				//12. - 13.====================
				region12:[],
				region13:[],
				defaultRegion:['广东省','广州市','番禺区'],
				defaultRegionCode:'440113',
				censusAddress: '',
				startAddress: '',
				
				//14.======================
				isSurveyShow14: false,
				surveyLabel14: null,
				surveyValue14: null,
				endAddress: '',
				surveyColumns14: [[{
					label: '东镇街道',
					value: 1
				}, {
					label: '镇隆镇',
					value: 2
				}, {
					label: '池洞镇',
					value: 3
				}, {
					label: '北界镇',
					value: 4
				}, {
					label: '水口镇',
					value: 5
				}, {
					label: '朱砂镇',
					value: 6
				}, {
					label: '贵子镇',
					value: 7
				}, {
					label: '怀乡镇',
					value: 8
				}, {
					label: '丁堡镇',
					value: 9
				}, {
					label: '金垌镇',
					value: 10
				}, {
					label: '洪冠镇',
					value: 11
				}, {
					label: '平塘镇',
					value: 12
				}, {
					label: '思贺镇',
					value: 13
				}, {
					label: '白石镇',
					value: 14
				}, {
					label: '钱排镇',
					value: 15
				}, {
					label: '新宝镇',
					value: 16
				}, {
					label: '合水镇',
					value: 17
				}, {
					label: '大成镇',
					value: 18
				}, {
					label: '茶山镇',
					value: 19
				}]],
				
				
				//15.======================
				surveyList15: [{
					name: '飞机',
					disabled: false,
					value: 1
				},
				{
					name: '高铁',
					disabled: false,
					value: 2
				},
				{
					name: '大巴车',
					disabled: false,
					value: 3
				}, {
					name: '网约车',
					disabled: false,
					value: 4
				}, {
					name: '自驾车',
					disabled: false,
					value: 5
				}, {
					name: '其他',
					disabled: false,
					value: 6
				}],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				surveyValue15: 0,
				
				//16.-17.======================
				textarea16: '',
				textarea17: '',
				
				//18.======================
				surveyList18: [{
					name: '是',
					disabled: false,
					value: 1
				},
				{
					name: '否',
					disabled: false,
					value: 2
				}],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				surveyValue18: 0,
				
				//19.======================
				surveyList19: [{
					name: '从事疫情防控或医护工作',
					disabled: false,
					value: 1
				},
				{
					name: '从事农贸市场工作',
					disabled: false,
					value: 2
				},
				{
					name: '从事物流快递工作',
					disabled: false,
					value: 3
				}, {
					name: '从事进出口或冷链工作',
					disabled: false,
					value: 4
				}, {
					name: '其他',
					disabled: false,
					value: 5
				}, {
					name: '否',
					disabled: false,
					value: 6
				}],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				surveyValue19: 0,
				
				//20.======================
				surveyList20: [{
					name: '已接种一针',
					disabled: false,
					value: 1
				},
				{
					name: '已接种二针',
					disabled: false,
					value: 2
				},
				{
					name: '已接种三针',
					disabled: false,
					value: 3
				}, {
					name: '暂没接种',
					disabled: false,
					value: 4
				}],
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				surveyValue20: 0,
				
				//21.======================
				textarea21: '',
				
				isDisable: true,  //提交按钮是否禁用
				isVerifyShow: false,  //是否显示滑块验证
				isVerifyValue: false,  //滑块验证值
				isSubmitConfirmshow: false, //提交成功确认按钮
				confirmSuccessText: '已提交成功！',
					
			}
		},
		computed:{
			regionName12(){
				// 转为字符串
				return this.region12.map(item=>item.name).join(' ')
			},
			regionName13(){
				// 转为字符串
				return this.region13.map(item=>item.name).join(' ')
			}
		},
		onLoad() {
			
		},
		methods: {
			async groupChange4(n) {
				console.log('groupChange4', n);
				
				this.surveyValue4 = n;
				
				if(this.surveyValue4 == 5) {
					// 询问用户是否提交
					const [err, succ] = await uni.showModal({
						title: '提示',
						content: '请注意你选择的是阳性。'
					}).catch(err => err)
					
					if (err || !succ || !succ.confirm) {
						
						this.surveyValue4 = 0;
						
						return uni.showToast({
							title: '请重新选择核酸检测结果',
							icon: 'none',
							duration: 2000
						});
						
					}
					
				}

				
			},
			groupChange5(n) {
				console.log('groupChange5', n);
				
				this.surveyValue5 = n;
			},
			groupChange7(n) {
				console.log('groupChange7', n);
				
				this.surveyValue7 = n;
			},
			groupChange11(n) {
				console.log('groupChange11', n);
				
				this.surveyValue11 = n;
			},
			groupChange15(n) {
				console.log('groupChange15', n);
				
				this.surveyValue15 = n;
			},
			groupChange18(n) {
				console.log('groupChange18', n);
				
				this.surveyValue18 = n;
			},
			groupChange19(n) {
				console.log('groupChange19', n);
				
				this.surveyValue19 = n;
			},
			groupChange20(n) {
				console.log('groupChange20', n);
				
				this.surveyValue20 = n;
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					console.log(result);
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: this.baseUrl + result.fileName,
						fileName: result.fileName
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: uni.$url.upload, // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(JSON.parse(res.data))
							}, 1000)
						}
					});
				})
			},
			//9.获取日期
			confirm9(e) {
				console.log(e);
				this.isSurveyShow9 = false;
				this.surveyValue9 = e[0];
			},
			closeSurveyShow9() {
				this.isSurveyShow9 = false;
			},
			//10.获取日期
			confirm10(e) {
				console.log(e);
				this.isSurveyShow10 = false;
				this.surveyValue10 = e[0];
			},
			closeSurveyShow10() {
				this.isSurveyShow10 = false;
			},
            // 获取选择的地区
            handleGetRegion12(region){
                this.region12 = region
            },
            handleGetRegion13(region){
                this.region13 = region
            },
            handleGetRegion13(region){
                this.region13 = region
            },
			closeSurveyShow14() {
				
				console.log('取消14')
				
				this.isSurveyShow14 = false
			},
			confirm14(e) {
				console.log('confirm', e);
				this.isSurveyShow14 = false;
				this.surveyLabel14 = e.value[0]['label'];
				this.surveyValue14 = e.value[0]['value'];
			},
			async submit() {
				


				
				if (!this.name || this.name == '') return uni.showToast({
					title: '请输入姓名',
					icon: 'none',
					duration: 2000
				});
				
				if (!this.idNumber || this.idNumber == '') return uni.showToast({
					title: '请输入身份证号',
					icon: 'none',
					duration: 2000
				});
				
				//大陆 15或者18位带X
				let reg_idNumber1 = new RegExp(/(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
				//香港 开头一位或两位大写字母，然后接上6-10位数字，最后一位数字或字母校验
				let reg_idNumber2 = new RegExp(/^[A-Z]{1,2}[0-9]{6,10}[0-9A-Z]$/);
				//澳门 开头数字1或者5或者7，然后接上6位数字，再接上一位数字或者大写字母校验
				let reg_idNumber3 = new RegExp(/^[1|5|7][0-9]{6}[0-9A-Z]$/);
				//台湾 开头一位小写或者大写字母，接上9位数字
				let reg_idNumber4 = new RegExp(/^[a-zA-Z][0-9]{9}$/);
				//港澳通行证 
				let reg_idNumber5 = new RegExp(/^[CW]\d{8}$/);
				// 校验身份证
				if( reg_idNumber1.test( this.idNumber ) || reg_idNumber2.test( this.idNumber ) || reg_idNumber3.test( this.idNumber ) || reg_idNumber4.test( this.idNumber ) || reg_idNumber5.test( this.idNumber )) {
					console.log(' 验证通过 ')
				} else {
					return uni.showToast({
						title: '请正确填写的身份证号',
						icon: 'none',
						duration: 2000
					});
				}
				
				
				if (!this.mobile || this.mobile == '') return uni.showToast({
					title: '请输入手机号',
					icon: 'none',
					duration: 2000
				});
				
				
				//正则验证手机号码
				let reg_mobile = new RegExp(/^\d{11}$/);
				if(!reg_mobile.test(this.mobile)) {
				  return uni.showToast({
					title: '请正确填写您的手机号码',
					icon: 'none',
					duration: 3500
				  });
				}
				
				
				if (!this.surveyValue4 || this.surveyValue4 == '') return uni.showToast({
					title: '请选择核酸检测结果',
					icon: 'none',
					duration: 2000
				});
				
				
				if (!this.surveyValue5 || this.surveyValue5 == '') return uni.showToast({
					title: '请选择粤康码状态',
					icon: 'none',
					duration: 2000
				});
				
				
				if (!this.fileList6 || this.fileList6 == '') return uni.showToast({
					title: '请上传粤康码（健康码）截图',
					icon: 'none',
					duration: 2000
				});
				
				
				if (!this.surveyValue7 || this.surveyValue7 == '') return uni.showToast({
					title: '请选择行程码状态',
					icon: 'none',
					duration: 2000
				});
				
				
				if (!this.fileList8 || this.fileList8 == '') return uni.showToast({
					title: '请上传行程码截图',
					icon: 'none',
					duration: 2000
				});
				
				
				if (!this.surveyValue9 || this.surveyValue9 == '') return uni.showToast({
					title: '请选择备案登记日期',
					icon: 'none',
					duration: 2000
				});
				
				
				if (!this.surveyValue10 || this.surveyValue10 == '') return uni.showToast({
					title: '请选择来（返）乡日期',
					icon: 'none',
					duration: 2000
				});
				
				
				if (!this.surveyValue11 || this.surveyValue11 == '') return uni.showToast({
					title: '您是否从中高风险区来(返)乡',
					icon: 'none',
					duration: 2000
				});
				
				
				if (!this.regionName12 || this.regionName12 == '') return uni.showToast({
					title: '请选择您的户籍（省市区）',
					icon: 'none',
					duration: 2000
				});
				
				
				if (!this.censusAddress || this.censusAddress == '') return uni.showToast({
					title: '请填写您的户籍详细地址',
					icon: 'none',
					duration: 2000
				});
				
				if (!this.regionName13 || this.regionName13 == '') return uni.showToast({
					title: '请选择出发地（省市区）',
					icon: 'none',
					duration: 2000
				});
				
				if (!this.startAddress || this.startAddress == '') return uni.showToast({
					title: '请填写出发地详细地址',
					icon: 'none',
					duration: 2000
				});
				
				if (!this.surveyValue14 || this.surveyValue14 == '') return uni.showToast({
					title: '请选择目的地所属村（省市区）',
					icon: 'none',
					duration: 2000
				});
				
				if (!this.endAddress || this.endAddress == '') return uni.showToast({
					title: '请填写目的地所属村（社区）详细地址',
					icon: 'none',
					duration: 2000
				});
				
				if (!this.surveyValue15 || this.surveyValue15 == '') return uni.showToast({
					title: '请选择返乡使用的交通工具',
					icon: 'none',
					duration: 2000
				});
				
				if (!this.textarea16 || this.textarea16 == '') return uni.showToast({
					title: '请填写返乡行程安排',
					icon: 'none',
					duration: 2000
				});
				
				if (!this.textarea17 || this.textarea17 == '') return uni.showToast({
					title: '请填写行程逗留地点',
					icon: 'none',
					duration: 2000
				});
				
				if (!this.surveyValue18 || this.surveyValue18 == '') return uni.showToast({
					title: '请选择是否入境人员',
					icon: 'none',
					duration: 2000
				});
				
				if (!this.surveyValue19 || this.surveyValue19 == '') return uni.showToast({
					title: '请选择是否特定行业从业人员',
					icon: 'none',
					duration: 2000
				});
				
				if (!this.surveyValue20 || this.surveyValue20 == '') return uni.showToast({
					title: '请选择新冠疫苗接种情况',
					icon: 'none',
					duration: 2000
				});
				
				
				
				if (!this.isVerifyValue) {
					
					// uni.showToast({
					// 	title: '请拖动滑块完成验证',
					// 	icon: 'none',
					// 	duration: 2000
					// });
					
					this.isVerifyShow = true;
					
					return
				} 
				
				
				
				
				
				
				let query = {
					name: this.name,	//1.姓名
					idNumber: this.idNumber,	//2.身份证号
					mobile: this.mobile,	//3.手机号
					hsResult: this.surveyValue4,	//4.核酸检测结果
					healthyCode: this.surveyValue5,	//5.粤康码
					healthyCodePicture: this.fileList6[0]['fileName'],	//6.粤康码截图
					itineraryCode: this.surveyValue7,	//7.行程码
					itineraryCodePicture: this.fileList8[0]['fileName'],	//8.行程码截图
					filingDatetime: this.surveyValue9,	//9.备案登记日期
					backTownDate: this.surveyValue10,	//10.来（返）乡日期
					isHightWormingPlace: this.surveyValue11,	//11.是否从中高风险区来(返)乡
					census: this.regionName12,	//12.a.户籍（省市区）
					censusAddress: this.censusAddress,	//12.b.户籍详细地址
					startPlace: this.regionName13,	//13.a.出发地（省市区）
					startAddress: this.startAddress,	//13.b.出发地详细地址
					endPlace: this.surveyValue14,	//14.a.目的地所属村（省市区）
					endAddress: this.endAddress,	//14.b.目的地所属村（社区）详细地址
					backTownTool: this.surveyValue15,	//15.返乡使用的交通工具
					backTownPlane: this.textarea16,	//16.返乡行程安排
					itineraryStay: this.textarea17,	//17.行程逗留地点
					isEntryHuman: this.surveyValue18,	//18.是否入境人员
					isSpecialWorkPeople: this.surveyValue19,	//19.是否特定行业从业人员
					covidType: this.surveyValue20,	//20.新冠疫苗接种情况
					otherContent: this.textarea21,	//21.其他补充内容
				}
				
				console.log(query);
				
				//防止短时间内重复提交
				if(!this.isDisable) return;
				
				this.isDisable = false;
				
				let res = await uni.$http.post(uni.$url.save, query);
				
				//防止短时间内重复提交
				//1.5秒后取消button禁用
				setTimeout(() => {
					this.isDisable = true;
				},1500);
				
				this.isVerifyValue = false;
				
				if (res.data.code !== 0) return uni.$showMsg(res.data.msg);
				
				// uni.showToast({
				// 	title: res.data.msg,
				// 	icon: 'success',
				// 	duration: 2000
				// });
				
				this.confirmSuccessText = res.data.msg;
				
				this.isSubmitConfirmshow = true;

				
			},
			openSubmitConfirmshow() {
				
				this.confirmSuccessText = '已提交成功';
				
				this.isSubmitConfirmshow = true;
				
			},
			closeSubmitConfirmshow() {
				
				this.isSubmitConfirmshow = false;
				
				location.reload();
				
			},
			verifyShow() {
				this.isVerifyShow = true;
			},
			confirmVerify(e) {
				console.log('验证结果:',e);
				if(!e.msg) return uni.showToast({
					title: '请拖动滑块完成验证！',
					icon: 'error',
					duration: 2000
				});
				
				uni.showToast({
					title: '已完成验证！',
					icon: 'success',
					duration: 2000
				});
				
				this.isVerifyValue = true;
				
				this.isVerifyShow = false;
				
				this.submit();
			}
		}
	}
</script>

<style lang="scss">
	.header-wrap {
		position: relative;
		.bg-index {
			display: block;
			width: 750rpx;
			height: 400rpx;
		}
		.copyright {
			position: absolute;
			top: 20rpx;
			width: 100%;
			font-size: 36rpx;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
		}
		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			font-size: 40rpx;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
		}
	}
	
	.title-wrap {
		text-align: center;
		.title {
			padding: 40rpx 0;
			font-size: 30rpx;
			font-weight: 400;
			color: #000000;
		}
		.tips {
			// height: 70rpx;
			margin: 0 30rpx;
			line-height: 70rpx;
			background: #FEFFD8;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-weight: 400;
			color: #FF0000;
		}
	}
	
	.survey-wrap {
		.item-wrap {
			margin-top: 60rpx;
			padding: 0 30rpx;
			.item-title {
				margin-bottom: 30rpx;
				font-size: 30rpx;
				font-weight: 400;
				.sign {
					margin-right: 5rpx;
					color: #FF0000;
				}
				.text {
					color: #000000;
				}
			}
			.item-content {
				.input-text {
					height: 74rpx;
					line-height: 70rpx;
					padding: 0 30rpx;
					background: #FFFFFF;
					border: 1rpx solid #CCCCCC;
					border-radius: 10rpx;
				}
				.radio-group-wrap {
					padding: 20rpx 25rpx 0 25rpx;
					border: 1rpx solid #CCCCCC;
					border-radius: 10rpx;
					
				}
				.btn-calendar {
					height: 74rpx;
					line-height: 74rpx;
					padding: 0 20rpx;
					border: 1rpx solid #CCCCCC;
					border-radius: 10rpx;
					font-size: 30rpx;
					font-weight: 400;
					color: #010101;
				}
				.address-wrap {
					border: 1rpx solid #CCCCCC;
					border-radius: 10rpx;
					.address-select {
						border-bottom: 1rpx solid #cccccc;
						h2 {
							height: 74rpx;
							line-height: 70rpx;
							padding: 0 30rpx;
							font-size: 30rpx;
							font-weight: 400;
							color: #000000;
						}
						.btn-village {
							height: 74rpx;
							line-height: 70rpx;
							padding: 0 30rpx;
							font-size: 30rpx;
							font-weight: 400;
							color: #000000;
						}
					}
					.address-detail {
						.input-text {
							border: none;
						}
					}
				}
			}
			.item-tips {
				font-size: 24rpx;
				font-weight: 400;
				color: #888888;
			}
		}
	}
	
	
	.handler-wrap {
		padding: 60rpx 0;
		.btn-submit {
			height: 74rpx;
			line-height: 74rpx;
			margin: 0 30rpx;
			background: #1992ED;
			border-radius: 10rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #FFFFFF;
			text-align: center;
			&[disabled] {
				color: #AAAAAA;
				background: #EFEFEF;
			}
		}
	}
	
	
	.verify-wrap {
		padding: 30rpx;
		.verify {
			.verify-title {
				margin: 30rpx;
				text-align: center;
			}
		}
	}
	
	.submit-confirm-wrap {
		// padding: 100rpx 50rpx;
		// width: 690rpx;
		margin: 100rpx 30rpx;
		.btn-submit-confirm {
			
		}
		.tips {
			display: block;
			// width: 100%;
			// height: 70rpx;
			margin: 30rpx 0;
			padding: 20rpx;
			line-height: 70rpx;
			background: #FEFFD8;
			border-radius: 10rpx;
			font-size: 34rpx;
			font-weight: 400;
			color: #FF0000;
			box-sizing: border-box;
			text-align: center;
		}
	}
	
</style>
