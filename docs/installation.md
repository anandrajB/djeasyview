

# Djeasy view installation



**install**

```python{4}
pip install djeasyview
```


## Legend 

- The *select_related* , *prefetch_related* , *caching* , *ordering* , *query_params* are optional in the views

## GET and POST API's

```python3
from djeasyview import DjeasyListCreateView
from app.models import User
from app.serializers import UserListSerializer
from rest_framework.permissions import IsAuthenticated

class UserListCreateApiView(DjeasyListCreateView):
    model = User
    list_serializer_class = UserListSerializer
    create_serializer_class = UserCreateSerializer
    serializer_class = UserListSerializer
    queryset = User.objects.all()
    select_related = ['key1' , 'key2']  
    prefetch_related = ['key1' , 'key2']  
    permission_classes = [IsAuthenticated]
    enable_cache = True  
    cache_duration = 60  
    ordering = ['id'] 
    query_params = {
        "name": "name",
        "related_field__id": "related_id",
        "related_field__name": "related_name",
    } 

```



## UPDATE , RETRIEVE and DELETE API's

```python3
from djeasyview import DjeasyRetrieveUpdateApiView
from app.models import User
from app.serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated

class UserRetrieveUpdateDestroyApiView(DjeasyRetrieveUpdateApiView):
    model = User
    list_serializer_class = UserSerializer
    create_serializer_class = UserSerializer
    serializer_class = UserSerializer
    queryset = User.objects.all()
    select_related = ['key1' , 'key2']
    prefetch_related = ['key1' , 'key2']
    permission_classes = [IsAuthenticated]
    enable_cache = True
    cache_duration = 60

```




## Customization


### queryset 


```python3
def get_queryset(self):
  super().get_queryset()
  return YourModel.objects.filter(**filter_conditions)
```


### Responses

```python3
from rest_framework.response import Response
def get_response(self, serializer_klass, queryset):
    super().get_response(serializer_klass, self.get_queryset())
    response = {"status" : "success" , "data" : serializer_klass(queryset).data}
    return Response(response)
```