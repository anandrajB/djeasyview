# Dj Easy view CRUD mixins

Makes your CRUD's even more smaller and customizable with dj easy views .

## Installation

```
pip install djeasyview
```

## Usage

# For Designing API's
### GET and POST api's

This mixin provides generic implementations for listing and creating resources.

#### Example:

```python
from djeasyview import DjeasyListCreateView
from your_app.models import YourModel
from your_app.serializers import YourModelSerializer
from rest_framework.permissions import IsAuthenticated

class YourView(DjeasyListCreateView):
    model = YourModel
    list_serializer_class = YourModelSerializer
    create_serializer_class = YourModelSerializer
    serializer_class = YourModelSerializer
    queryset = YourModel
    select_related = ['key1' , 'key2']
    prefetch_related = ['key1' , 'key2']
    permission_classes = [IsAuthenticated]
    enable_cache = True
    cache_duration = 60
    query_params = {
        "name": "name",
        "related_field__id": "related_id",
        "related_field__name": "related_name",
    }
    pagination = True
```


- with query params
```
e.g., localhost:8000/view/?name="anand"&related_id=1&related_name="anandraj"
```
- with pagination
```
e.g., localhost:8000/view/?page_size=10&page_number=1"
```
 

### GET , PUT , PATCH , DELETE api's

This mixin provides generic implementations for Retrive , updating and deleting resources.

```python
from djeasyview import DjeasyRetrieveUpdateApiView
from your_app.models import YourModel
from your_app.serializers import YourModelSerializer
from rest_framework.permissions import IsAuthenticated

class YourView(DjeasyRetrieveUpdateApiView):
    model = YourModel
    list_serializer_class = YourModelSerializer
    create_serializer_class = YourModelSerializer
    serializer_class = YourModelSerializer
    queryset = YourModel
    select_related = ['key1' , 'key2']
    prefetch_related = ['key1' , 'key2']
    permission_classes = [IsAuthenticated]
    enable_cache = True
    cache_duration = 60
```




#### Customization:


1. customize your get_queryset

    ```python
        def get_queryset(self):
            super().get_queryset()
            return YourModel.objects.filter(**filter_conditions)
    ```

2. customize your responses
    ```python
        from rest_framework.response import Response
        def get_response(self, serializer_klass, queryset):
            super().get_response(serializer_klass, self.get_queryset())
            return Response(serializer_klass(queryset).data)
    ```



# For Designing serializers



### For creating new serializer instance 
```python

from djeasyview.serializers import DjeasyModelSerializer

serializer = DjeasyModelSerializer.options(
    model_name=UserModel,
    queryset=UserModel.objects.all(),
    fields="__all__",
    many=True,
    display_fields={"id","name","email","password","profile"},
    related_fields={
        "profile": {
            "many": False,
            "read_only": True,
            "slug_field": "display_name",
        },
    },
    access_fields={"password": "read_only"},
    rename_fields = {"name" : "username"}
).data
```