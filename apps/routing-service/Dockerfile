#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["apps/routing-service/Petrologistic.Routing.Service.csproj", "apps/routing-service/"]
COPY ["libs/services/Petrologistic.Core.Routing/Petrologistic.Service.Routing.csproj", "libs/services/Petrologistic.Core.Routing/"]
RUN dotnet restore "apps/routing-service/Petrologistic.Routing.Service.csproj"
COPY . .
WORKDIR "/src/apps/routing-service"
RUN dotnet build "Petrologistic.Routing.Service.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Petrologistic.Routing.Service.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Petrologistic.Routing.Service.dll"]