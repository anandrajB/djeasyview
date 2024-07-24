import{_ as s,c as a,o as e,a3 as n}from"./chunks/framework.B2Sicsqr.js";const _=JSON.parse('{"title":"Djeasy view installation","description":"","frontmatter":{},"headers":[],"relativePath":"installation.md","filePath":"installation.md"}'),p={name:"installation.md"},i=n(`<h1 id="djeasy-view-installation" tabindex="-1">Djeasy view installation <a class="header-anchor" href="#djeasy-view-installation" aria-label="Permalink to &quot;Djeasy view installation&quot;">​</a></h1><p><strong>install</strong></p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">pip install djeasyview</span></span></code></pre></div><h2 id="legend" tabindex="-1">Legend <a class="header-anchor" href="#legend" aria-label="Permalink to &quot;Legend&quot;">​</a></h2><ul><li>The <em>select_related</em> , <em>prefetch_related</em> , <em>caching</em> , <em>ordering</em> , <em>query_params</em> are optional in the views</li></ul><h2 id="get-and-post-api-s" tabindex="-1">GET and POST API&#39;s <a class="header-anchor" href="#get-and-post-api-s" aria-label="Permalink to &quot;GET and POST API&#39;s&quot;">​</a></h2><div class="language-python3 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python3</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from djeasyview import DjeasyListCreateView</span></span>
<span class="line"><span>from app.models import User</span></span>
<span class="line"><span>from app.serializers import UserListSerializer</span></span>
<span class="line"><span>from rest_framework.permissions import IsAuthenticated</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class UserListCreateApiView(DjeasyListCreateView):</span></span>
<span class="line"><span>    model = User</span></span>
<span class="line"><span>    list_serializer_class = UserListSerializer</span></span>
<span class="line"><span>    create_serializer_class = UserCreateSerializer</span></span>
<span class="line"><span>    serializer_class = UserListSerializer</span></span>
<span class="line"><span>    queryset = User.objects.all()</span></span>
<span class="line"><span>    select_related = [&#39;key1&#39; , &#39;key2&#39;]  </span></span>
<span class="line"><span>    prefetch_related = [&#39;key1&#39; , &#39;key2&#39;]  </span></span>
<span class="line"><span>    permission_classes = [IsAuthenticated]</span></span>
<span class="line"><span>    enable_cache = True  </span></span>
<span class="line"><span>    cache_duration = 60  </span></span>
<span class="line"><span>    ordering = [&#39;id&#39;] </span></span>
<span class="line"><span>    query_params = {</span></span>
<span class="line"><span>        &quot;name&quot;: &quot;name&quot;,</span></span>
<span class="line"><span>        &quot;related_field__id&quot;: &quot;related_id&quot;,</span></span>
<span class="line"><span>        &quot;related_field__name&quot;: &quot;related_name&quot;,</span></span>
<span class="line"><span>    }</span></span></code></pre></div><h2 id="update-retrieve-and-delete-api-s" tabindex="-1">UPDATE , RETRIEVE and DELETE API&#39;s <a class="header-anchor" href="#update-retrieve-and-delete-api-s" aria-label="Permalink to &quot;UPDATE , RETRIEVE and DELETE API&#39;s&quot;">​</a></h2><div class="language-python3 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python3</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from djeasyview import DjeasyRetrieveUpdateApiView</span></span>
<span class="line"><span>from app.models import User</span></span>
<span class="line"><span>from app.serializers import UserSerializer</span></span>
<span class="line"><span>from rest_framework.permissions import IsAuthenticated</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class UserRetrieveUpdateDestroyApiView(DjeasyRetrieveUpdateApiView):</span></span>
<span class="line"><span>    model = User</span></span>
<span class="line"><span>    list_serializer_class = UserSerializer</span></span>
<span class="line"><span>    create_serializer_class = UserSerializer</span></span>
<span class="line"><span>    serializer_class = UserSerializer</span></span>
<span class="line"><span>    queryset = User.objects.all()</span></span>
<span class="line"><span>    select_related = [&#39;key1&#39; , &#39;key2&#39;]</span></span>
<span class="line"><span>    prefetch_related = [&#39;key1&#39; , &#39;key2&#39;]</span></span>
<span class="line"><span>    permission_classes = [IsAuthenticated]</span></span>
<span class="line"><span>    enable_cache = True</span></span>
<span class="line"><span>    cache_duration = 60</span></span></code></pre></div><h2 id="customization" tabindex="-1">Customization <a class="header-anchor" href="#customization" aria-label="Permalink to &quot;Customization&quot;">​</a></h2><h3 id="queryset" tabindex="-1">queryset <a class="header-anchor" href="#queryset" aria-label="Permalink to &quot;queryset&quot;">​</a></h3><div class="language-python3 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python3</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>def get_queryset(self):</span></span>
<span class="line"><span>  super().get_queryset()</span></span>
<span class="line"><span>  return YourModel.objects.filter(**filter_conditions)</span></span></code></pre></div><h3 id="responses" tabindex="-1">Responses <a class="header-anchor" href="#responses" aria-label="Permalink to &quot;Responses&quot;">​</a></h3><div class="language-python3 vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python3</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>from rest_framework.response import Response</span></span>
<span class="line"><span>def get_response(self, serializer_klass, queryset):</span></span>
<span class="line"><span>    super().get_response(serializer_klass, self.get_queryset())</span></span>
<span class="line"><span>    response = {&quot;status&quot; : &quot;success&quot; , &quot;data&quot; : serializer_klass(queryset).data}</span></span>
<span class="line"><span>    return Response(response)</span></span></code></pre></div>`,14),t=[i];function l(r,o,c,d,h,u){return e(),a("div",null,t)}const y=s(p,[["render",l]]);export{_ as __pageData,y as default};
